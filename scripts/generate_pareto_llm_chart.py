#!/usr/bin/env python3
"""Generate the Pareto LLM pricing chart from Artificial Analysis data."""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import urllib.error
import urllib.request
from datetime import date
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_ENV = ROOT / ".env"
DEFAULT_OUTPUT = ROOT / "content" / "published" / "pareto-llm-pricing-chart.html"
DEFAULT_TEMPLATE = DEFAULT_OUTPUT
API_URL = "https://artificialanalysis.ai/api/v2/data/llms/models"
PUBLIC_MODELS_URL = "https://artificialanalysis.ai/models?intelligence-index-cost=intelligence-vs-cost"

METRICS_CONFIG = [
    {
        "key": "intelligence_index",
        "label": "Intelligence Index",
        "field": "intelligence",
        "source": "artificial_analysis_intelligence_index",
    },
    {
        "key": "coding_index",
        "label": "Coding Index",
        "field": "coding_index",
        "source": "artificial_analysis_coding_index",
    },
    {
        "key": "math_index",
        "label": "Math Index",
        "field": "math_index",
        "source": "artificial_analysis_math_index",
    },
    {
        "key": "livecodebench",
        "label": "LiveCodeBench",
        "field": "livecodebench",
        "source": "livecodebench",
    },
    {
        "key": "gpqa",
        "label": "GPQA (Science)",
        "field": "gpqa",
        "source": "gpqa",
    },
]

X_AXIS_CONFIG = [
    {
        "key": "cost",
        "label": "Blended $/1M tokens",
        "field": "cost",
        "title": "Blended cost per 1M tokens (USD)",
        "unit": "$",
        "precision": 3,
    },
    {
        "key": "index_cost",
        "label": "Cost to run Intelligence Index",
        "field": "index_cost",
        "title": "Cost to run Artificial Analysis Intelligence Index (USD)",
        "unit": "$",
        "precision": 2,
    },
]


def load_dotenv(path: Path) -> None:
    if not path.exists():
        return

    for line in path.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#") or "=" not in stripped:
            continue

        key, value = stripped.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        os.environ.setdefault(key, value)


def fetch_models(api_key: str) -> list[dict[str, Any]]:
    request = urllib.request.Request(API_URL, headers={"x-api-key": api_key})

    try:
        with urllib.request.urlopen(request, timeout=45) as response:
            payload = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"Artificial Analysis API returned HTTP {exc.code}: {body}") from exc
    except urllib.error.URLError as exc:
        raise RuntimeError(f"Could not reach Artificial Analysis API: {exc.reason}") from exc

    if payload.get("status") != 200:
        raise RuntimeError(f"Unexpected Artificial Analysis API status: {payload.get('status')}")

    data = payload.get("data")
    if not isinstance(data, list):
        raise RuntimeError("Artificial Analysis API response did not contain a data list")

    return data


def fetch_public_models_page() -> str:
    request = urllib.request.Request(
        PUBLIC_MODELS_URL,
        headers={
            "User-Agent": "personal-brand-chart-generator/1.0",
            "Accept": "text/html",
        },
    )

    try:
        with urllib.request.urlopen(request, timeout=60) as response:
            return response.read().decode("utf-8", errors="replace")
    except urllib.error.URLError as exc:
        raise RuntimeError(f"Could not fetch Artificial Analysis public models page: {exc}") from exc


def decode_next_flight_payload(html: str) -> str:
    chunks: list[str] = []
    pattern = re.compile(r'<script>self\.__next_f\.push\(\[1,"(.*?)"\]\)</script>')
    for match in pattern.finditer(html):
        try:
            chunks.append(json.loads(f'"{match.group(1)}"'))
        except json.JSONDecodeError:
            continue
    return "".join(chunks)


def normalize_lookup_name(value: Any) -> str:
    if not value:
        return ""
    return re.sub(r"[^a-z0-9]+", " ", str(value).casefold()).strip()


def decode_json_string(value: str) -> str:
    try:
        return json.loads(f'"{value}"')
    except json.JSONDecodeError:
        return value


def decode_json_array_after_key(payload: str, key: str) -> list[dict[str, Any]]:
    start = payload.find(f'"{key}":')
    if start == -1:
        return []

    start += len(key) + 3
    try:
        value, _ = json.JSONDecoder().raw_decode(payload[start:])
    except json.JSONDecodeError:
        return []

    if not isinstance(value, list):
        return []
    return [item for item in value if isinstance(item, dict)]


def decode_model_objects(payload: str) -> list[dict[str, Any]]:
    """Decode model-shaped JSON objects embedded in the Next flight payload."""
    decoder = json.JSONDecoder()
    models: list[dict[str, Any]] = []
    position = 0

    while True:
        position = payload.find('{"id":"', position)
        if position == -1:
            break

        try:
            value, end = decoder.raw_decode(payload[position:])
        except json.JSONDecodeError:
            position += 1
            continue

        if (
            isinstance(value, dict)
            and value.get("slug")
            and (value.get("name") or value.get("shortName") or value.get("short_name"))
            and (
                value.get("releaseDate")
                or value.get("release_date")
                or value.get("intelligenceIndexCost")
                or value.get("intelligence_index_cost")
            )
        ):
            models.append(value)

        position += end

    return models


def index_total_cost(model: dict[str, Any]) -> float | None:
    cost = model.get("intelligenceIndexCost") or model.get("intelligence_index_cost") or {}
    if not isinstance(cost, dict):
        return None
    return as_number(cost.get("total") or cost.get("total_cost"))


def add_public_metadata_entry(
    metadata: dict[str, dict[str, Any]],
    *,
    slug: str | None,
    name: str | None,
    release_date: Any = None,
    index_cost: Any = None,
) -> None:
    entry: dict[str, Any] = {}
    if release_date:
        entry["release_date"] = str(release_date)
    normalized_cost = as_number(index_cost)
    if normalized_cost is not None:
        entry["index_cost"] = normalized_cost
    if not entry:
        return

    if slug:
        metadata.setdefault(f"slug:{slug}", {}).update(entry)

    normalized_name = normalize_lookup_name(name)
    if normalized_name:
        metadata.setdefault(f"name:{normalized_name}", {}).update(entry)


def fetch_public_model_metadata() -> dict[str, dict[str, Any]]:
    """Read AA's public page data for fields not exposed by the free API."""
    html = fetch_public_models_page()
    flight_payload = decode_next_flight_payload(html)

    metadata: dict[str, dict[str, Any]] = {}

    models_by_slug: dict[str, dict[str, Any]] = {}
    decoded_models = (
        decode_json_array_after_key(flight_payload, "initialModels")
        + decode_model_objects(flight_payload)
    )
    for model in decoded_models:
        slug = model.get("slug")
        if not slug or slug in models_by_slug:
            continue
        models_by_slug[slug] = model

    for model in models_by_slug.values():
        add_public_metadata_entry(
            metadata,
            slug=model.get("slug"),
            name=model.get("shortName") or model.get("short_name") or model.get("name"),
            release_date=model.get("releaseDate") or model.get("release_date"),
            index_cost=index_total_cost(model),
        )

    if metadata:
        return metadata

    release_pattern = re.compile(
        r'"(?:release_date|releaseDate)":"(?P<release_date>\d{4}-\d{2}-\d{2})".{0,3000}?'
        r'"(?:short_name|shortName)":"(?P<short_name>(?:[^"\\]|\\.)*)".{0,3000}?'
        r'"slug":"(?P<slug>[^"\\]+)"',
        re.S,
    )
    for match in release_pattern.finditer(flight_payload):
        add_public_metadata_entry(
            metadata,
            slug=match.group("slug"),
            name=decode_json_string(match.group("short_name")),
            release_date=match.group("release_date"),
        )

    cost_pattern = re.compile(
        r'"(?:short_name|shortName)":"(?P<short_name>(?:[^"\\]|\\.)*)".{0,3000}?'
        r'"slug":"(?P<slug>[^"\\]+)".{0,40000}?'
        r'"(?:intelligence_index_cost|intelligenceIndexCost)":\{'
        r'(?:"total_cost"|"total"):(?P<cost>[0-9.eE+-]+|null)',
        re.S,
    )
    for match in cost_pattern.finditer(flight_payload):
        cost = match.group("cost")
        if cost == "null":
            continue

        add_public_metadata_entry(
            metadata,
            slug=match.group("slug"),
            name=decode_json_string(match.group("short_name")),
            index_cost=cost,
        )

    return metadata


def as_number(value: Any) -> float | None:
    if value is None or value == "":
        return None
    try:
        number = float(value)
    except (TypeError, ValueError):
        return None
    return round(number, 3)


def as_price_string(value: Any) -> str:
    number = as_number(value)
    if number is None:
        return ""
    return f"{number:g}"


def transform_models(
    models: list[dict[str, Any]],
    public_metadata: dict[str, dict[str, Any]] | None = None,
) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    public_metadata = public_metadata or {}

    metric_fields = {metric["field"] for metric in METRICS_CONFIG}

    for model in models:
        pricing = model.get("pricing") or {}
        evaluations = model.get("evaluations") or {}
        creator = model.get("model_creator") or {}

        blended_cost = as_number(pricing.get("price_1m_blended_3_to_1"))
        if blended_cost is None or blended_cost <= 0:
            continue

        name = model.get("name") or model.get("slug") or model.get("id") or "Unknown model"
        slug = model.get("slug") or ""
        metadata = public_metadata.get(f"slug:{slug}")
        if metadata is None:
            metadata = public_metadata.get(f"name:{normalize_lookup_name(name)}")
        metadata = metadata or {}

        row: dict[str, Any] = {
            "id": model.get("id") or "",
            "name": name,
            "slug": slug,
            "provider": creator.get("name") or "Unknown",
            "cost": blended_cost,
            "index_cost": as_number(metadata.get("index_cost")),
            "release_date": metadata.get("release_date") or "",
            "input_price": as_price_string(pricing.get("price_1m_input_tokens")),
            "output_price": as_price_string(pricing.get("price_1m_output_tokens")),
            "tokens_per_sec": as_price_string(model.get("median_output_tokens_per_second")),
            "ttft": as_price_string(model.get("median_time_to_first_token_seconds")),
        }

        for metric in METRICS_CONFIG:
            row[metric["field"]] = as_number(evaluations.get(metric["source"]))

        if any(row[field] is not None for field in metric_fields):
            rows.append(row)

    rows.sort(key=lambda row: (-(row.get("intelligence") or -1), row["cost"], row["name"]))
    return rows


def compute_pareto_frontier(
    data: list[dict[str, Any]],
    y_field: str,
    x_field: str,
    x_end: float | None = None,
) -> dict[str, Any]:
    valid = [
        row for row in data
        if row.get(y_field) is not None and row.get(x_field) is not None and row.get(x_field) > 0
    ]
    valid.sort(key=lambda row: (row[x_field], -(row[y_field] or 0), row["name"]))

    if not valid:
        return {"stairs": [], "pareto_names": []}

    frontier: list[dict[str, Any]] = []
    max_value = 0.0
    for row in valid:
        value = row[y_field]
        if value is not None and value > max_value:
            max_value = value
            frontier.append(row)

    if not frontier:
        return {"stairs": [], "pareto_names": []}

    min_cost = min(row[x_field] for row in valid)
    max_cost = max(row[x_field] for row in valid)
    stairs: list[dict[str, Any]] = []

    for index, row in enumerate(frontier):
        if index == 0:
            stairs.append({"x": min_cost * 0.9, "value": row[y_field]})
        else:
            stairs.append({"x": row[x_field], "value": frontier[index - 1][y_field]})
        stairs.append({"x": row[x_field], "value": row[y_field], "name": row["name"]})

    stairs.append({"x": x_end if x_end is not None else max_cost * 1.1, "value": frontier[-1][y_field]})
    return {"stairs": stairs, "pareto_names": [row["name"] for row in frontier]}


def parse_date(value: Any) -> date | None:
    if not value:
        return None
    try:
        return date.fromisoformat(str(value))
    except ValueError:
        return None


def quarter_label(value: date) -> str:
    return f"{value.year} Q{((value.month - 1) // 3) + 1}"


def quarter_end(value: date) -> date:
    quarter = ((value.month - 1) // 3) + 1
    month = quarter * 3
    day = 31 if month in {3, 12} else 30
    return date(value.year, month, day)


def next_quarter_start(value: date) -> date:
    quarter = ((value.month - 1) // 3) + 1
    if quarter == 4:
        return date(value.year + 1, 1, 1)
    return date(value.year, quarter * 3 + 1, 1)


def build_quarters(data: list[dict[str, Any]]) -> list[dict[str, str]]:
    release_dates = [parsed for row in data if (parsed := parse_date(row.get("release_date")))]
    if not release_dates:
        return []

    current = quarter_end(min(release_dates))
    last = quarter_end(max(release_dates))
    quarters: list[dict[str, str]] = []

    while current <= last:
        quarters.append(
            {
                "key": f"{current.year}-Q{((current.month - 1) // 3) + 1}",
                "label": f"{quarter_label(current)} ({current.isoformat()})",
                "end": current.isoformat(),
            }
        )
        current = quarter_end(next_quarter_start(current))

    return quarters


def build_metrics_data(data: list[dict[str, Any]]) -> dict[str, Any]:
    return {
        x_axis["key"]: {
            metric["key"]: compute_pareto_frontier(data, metric["field"], x_axis["field"])
            for metric in METRICS_CONFIG
        }
        for x_axis in X_AXIS_CONFIG
    }


def latest_x_end(data: list[dict[str, Any]], y_field: str, x_field: str) -> float | None:
    values = [
        row[x_field] for row in data
        if row.get(y_field) is not None and row.get(x_field) is not None and row.get(x_field) > 0
    ]
    if not values:
        return None
    return max(values) * 1.1


def build_quarterly_data(data: list[dict[str, Any]], quarters: list[dict[str, str]]) -> dict[str, Any]:
    return {
        x_axis["key"]: {
            metric["key"]: [
                {
                    "key": quarter["key"],
                    "label": quarter["label"],
                    "end": quarter["end"],
                    "pareto": compute_pareto_frontier(
                        [
                            row for row in data
                            if row.get("release_date") and row["release_date"] <= quarter["end"]
                        ],
                        metric["field"],
                        x_axis["field"],
                        latest_x_end(data, metric["field"], x_axis["field"]),
                    ),
                }
                for quarter in quarters
            ]
            for metric in METRICS_CONFIG
        }
        for x_axis in X_AXIS_CONFIG
    }


def js_json(value: Any) -> str:
    return json.dumps(value, ensure_ascii=False, separators=(",", ": ")).replace("</", "<\\/")


def replace_const(html: str, name: str, value: Any) -> str:
    pattern = re.compile(rf"^(\s*)const {re.escape(name)} = .*?;\s*$", re.MULTILINE)
    updated, count = pattern.subn(
        lambda match: f"{match.group(1)}const {name} = {js_json(value)};",
        html,
        count=1,
    )
    if count != 1:
        raise RuntimeError(f"Could not find JavaScript const {name!r} in template")
    return updated


X_AXIS_CONTROL_HTML = """                <div class="control-group">
                    <label>X-axis:</label>
                    <select id="xAxisSelect"></select>
                </div>
"""


MODEL_VISIBILITY_CONTROL_HTML = """                <div class="control-group">
                    <input type="checkbox" id="showModels" checked>
                    <label for="showModels">Model Points</label>
                </div>
"""


FRONTIER_HISTORY_CONTROL_HTML = """                <div class="control-group">
                    <label>Frontier:</label>
                    <select id="frontierModeSelect">
                        <option value="current">Current</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="slider">Time Slider</option>
                    </select>
                </div>
                <div class="control-group" id="quarterSliderGroup">
                    <label id="quarterLabel">Latest</label>
                    <input type="range" id="quarterSlider" min="0" max="0" value="0">
                </div>
"""


CLIENT_CHART_LOGIC = r"""
        function fallbackProviderColor(provider) {
            const palette = ['#7b2d3f', '#d97706', '#2d5ae5', '#0d9463', '#6b5b95', '#c06d3f', '#2a2630', '#b0873a', '#8a4f7a', '#4a6c8a', '#5e7c91', '#4a8a7a', '#a84a5c', '#5a8a3a', '#b5553a'];
            let hash = 0;
            for (let i = 0; i < provider.length; i++) hash = ((hash << 5) - hash) + provider.charCodeAt(i);
            return palette[Math.abs(hash) % palette.length];
        }

        function getColor(provider) { return providerColors[provider] || fallbackProviderColor(provider); }

        let currentMetric = metricsConfig[0].key;
        let currentXAxis = xAxisConfig[0].key;
        let currentQuarterIndex = Math.max(0, quarters.length - 1);
        let chart;
        let currentParetoNames = new Set();

        const tabsContainer = document.getElementById('tabs');
        metricsConfig.forEach(m => {
            const tab = document.createElement('div');
            tab.className = 'tab' + (m.key === currentMetric ? ' active' : '');
            tab.textContent = m.label;
            tab.onclick = () => switchMetric(m.key);
            tabsContainer.appendChild(tab);
        });

        const xAxisSelect = document.getElementById('xAxisSelect');
        xAxisConfig.forEach(x => {
            const opt = document.createElement('option');
            opt.value = x.key;
            opt.textContent = x.label;
            xAxisSelect.appendChild(opt);
        });

        const providers = [...new Set(rawData.map(d => d.provider))].sort();
        const providerFilter = document.getElementById('providerFilter');
        providers.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p;
            opt.textContent = p;
            providerFilter.appendChild(opt);
        });

        const legend = document.getElementById('legend');
        providers.forEach(p => {
            const item = document.createElement('div');
            item.className = 'legend-item';
            item.innerHTML = `<span class="legend-color" style="background: ${getColor(p)}"></span>${p}`;
            item.onclick = () => { providerFilter.value = p; updateChart(); };
            legend.appendChild(item);
        });

        const quarterSlider = document.getElementById('quarterSlider');
        if (quarters.length > 0) {
            quarterSlider.max = String(quarters.length - 1);
            quarterSlider.value = String(currentQuarterIndex);
        }

        function switchMetric(key) {
            currentMetric = key;
            document.querySelectorAll('.tab').forEach((t, i) => {
                t.classList.toggle('active', metricsConfig[i].key === key);
            });
            updateChart();
        }

        function getMetricConfig() { return metricsConfig.find(m => m.key === currentMetric); }
        function getXAxisConfig() { return xAxisConfig.find(x => x.key === currentXAxis); }
        function getParetoResult(metricKey, xAxisKey) { return metricsData?.[xAxisKey]?.[metricKey] || { stairs: [], pareto_names: [] }; }
        function getQuarterlyResults(metricKey, xAxisKey) { return quarterlyData?.[xAxisKey]?.[metricKey] || []; }
        function xValue(model) { return model[getXAxisConfig().field]; }
        function hasXValue(model) { const value = xValue(model); return value != null && value > 0; }
        function getFrontierMode() { return document.getElementById('frontierModeSelect').value; }
        function getSelectedQuarter() { return quarters[currentQuarterIndex] || null; }
        function isReleasedBy(model, quarter) { return !quarter || (model.release_date && model.release_date <= quarter.end); }

        function getSelectedQuarterResult() {
            const results = getQuarterlyResults(currentMetric, currentXAxis);
            return results[currentQuarterIndex] || results[results.length - 1] || { label: 'Current', pareto: getParetoResult(currentMetric, currentXAxis) };
        }

        function getActiveParetoResult() {
            return getFrontierMode() === 'slider'
                ? getSelectedQuarterResult().pareto
                : getParetoResult(currentMetric, currentXAxis);
        }

        function updateQuarterControls() {
            const sliderGroup = document.getElementById('quarterSliderGroup');
            const showSlider = getFrontierMode() === 'slider' && quarters.length > 0;
            sliderGroup.style.display = showSlider ? 'flex' : 'none';
            const quarter = getSelectedQuarter();
            document.getElementById('quarterLabel').textContent = quarter ? quarter.label : 'No dates';
        }

        function formatValue(value, precision = 3, unit = '') {
            if (value == null || Number.isNaN(value)) return 'N/A';
            const formatted = Number(value).toFixed(precision).replace(/\.?0+$/, '');
            return unit === '$' ? `$${formatted}` : `${formatted}${unit}`;
        }

        function frontierColor(index, total) {
            const palette = ['#7b2d3f', '#d97706', '#2d5ae5', '#0d9463', '#6b5b95', '#b0873a', '#a84a5c', '#4a6c8a'];
            return palette[index % palette.length] + (index === total - 1 ? 'ee' : '99');
        }

        function getAxisBounds(yField) {
            const valid = rawData.filter(d => d[yField] != null && hasXValue(d));
            if (valid.length === 0) return {};
            const xValues = valid.map(d => xValue(d));
            const yValues = valid.map(d => d[yField]);
            const minX = Math.min(...xValues);
            const maxX = Math.max(...xValues);
            const maxY = Math.max(...yValues);
            return {
                xMin: minX > 0 ? minX * 0.8 : undefined,
                xMax: maxX > 0 ? maxX * 1.1 : undefined,
                yMax: maxY > 0 ? maxY * 1.05 : undefined,
            };
        }

        function buildParetoDataset(pareto, label, color, width = 2, fill = false) {
            return {
                label,
                kind: 'pareto',
                data: pareto.stairs.map(p => ({ x: p.x, y: p.value, name: p.name })),
                type: 'line',
                borderColor: color,
                backgroundColor: fill ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
                borderWidth: width,
                fill,
                stepped: 'before',
                pointRadius: 0,
            };
        }

        function createChart() {
            const ctx = document.getElementById('chart').getContext('2d');
            const config = getMetricConfig();
            const xConfig = getXAxisConfig();
            const field = config.field;
            const scaleType = document.getElementById('scaleSelect').value;
            const showModels = document.getElementById('showModels').checked;
            const showPareto = document.getElementById('showPareto').checked;
            const labelMode = document.getElementById('labelMode').value;
            const selectedProvider = document.getElementById('providerFilter').value;
            const frontierMode = getFrontierMode();
            const selectedQuarter = getSelectedQuarter();

            updateQuarterControls();

            const paretoResult = getActiveParetoResult();
            const paretoNames = new Set(paretoResult.pareto_names);
            currentParetoNames = paretoNames;

            let filteredData = rawData.filter(d => d[field] != null && hasXValue(d));
            if (frontierMode === 'slider') {
                filteredData = filteredData.filter(d => isReleasedBy(d, selectedQuarter));
            }
            if (selectedProvider !== 'all') {
                filteredData = filteredData.filter(d => d.provider === selectedProvider);
            }

            document.getElementById('modelCount').textContent = filteredData.length;
            document.getElementById('paretoCount').textContent = paretoResult.pareto_names.length;

            const paretoList = document.getElementById('paretoList');
            paretoList.innerHTML = '';
            filteredData
                .filter(d => paretoNames.has(d.name))
                .sort((a, b) => xValue(a) - xValue(b))
                .forEach(d => {
                    const item = document.createElement('div');
                    item.className = 'pareto-item';
                    item.innerHTML = `<div class="name">${d.name}</div><div class="details">${d.provider} · ${config.label}: ${d[field]?.toFixed?.(2) || d[field]} · ${xConfig.label}: ${formatValue(xValue(d), xConfig.precision, xConfig.unit)}</div>`;
                    item.onclick = () => showModal(d);
                    paretoList.appendChild(item);
                });

            const datasets = [];

            if (showPareto && paretoResult.stairs.length > 0) {
                if (frontierMode === 'quarterly') {
                    const quarterlyResults = getQuarterlyResults(currentMetric, currentXAxis).filter(q => q.pareto.stairs.length > 0);
                    quarterlyResults.forEach((q, index) => {
                        datasets.push(buildParetoDataset(q.pareto, q.label, frontierColor(index, quarterlyResults.length), index === quarterlyResults.length - 1 ? 3 : 1.5));
                    });
                } else if (frontierMode === 'slider') {
                    const selected = getSelectedQuarterResult();
                    datasets.push(buildParetoDataset(paretoResult, selected.label, 'rgba(0, 212, 255, 0.8)', 2, true));
                } else {
                    datasets.push(buildParetoDataset(paretoResult, 'Current Pareto', 'rgba(0, 212, 255, 0.8)', 2, true));
                }
            }

            if (showModels) {
                datasets.push({
                    label: 'Models',
                    kind: 'models',
                    data: filteredData.map(d => ({ x: xValue(d), y: d[field], model: d })),
                    backgroundColor: filteredData.map(d => getColor(d.provider) + (paretoNames.has(d.name) ? 'ff' : '88')),
                    borderColor: filteredData.map(d => paretoNames.has(d.name) ? '#fff' : 'transparent'),
                    borderWidth: filteredData.map(d => paretoNames.has(d.name) ? 2 : 0),
                    pointRadius: filteredData.map(d => paretoNames.has(d.name) ? 8 : 5),
                    pointHoverRadius: 10,
                });
            }

            const axisBounds = getAxisBounds(field);

            chart = new Chart(ctx, {
                type: 'scatter',
                data: { datasets },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: { intersect: true, mode: 'nearest' },
                    plugins: {
                        legend: {
                            display: frontierMode === 'quarterly',
                            labels: { filter: item => item.text !== 'Models' }
                        },
                        tooltip: {
                            callbacks: {
                                label: ctx => {
                                    if (ctx.dataset.kind !== 'models') return ctx.dataset.label;
                                    const m = ctx.raw.model;
                                    return `${m.name} - ${config.label}: ${m[field]?.toFixed?.(2) || m[field]}, ${xConfig.label}: ${formatValue(xValue(m), xConfig.precision, xConfig.unit)}`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            type: scaleType === 'log' ? 'logarithmic' : 'linear',
                            title: { display: true, text: xConfig.title, color: '#6b6461' },
                            grid: { color: 'rgba(0,0,0,0.06)' },
                            min: scaleType === 'log' ? axisBounds.xMin : 0,
                            max: axisBounds.xMax,
                            ticks: { color: '#6b6461', callback: v => formatValue(v, xConfig.precision, xConfig.unit) }
                        },
                        y: {
                            title: { display: true, text: config.label, color: '#6b6461' },
                            grid: { color: 'rgba(0,0,0,0.06)' },
                            ticks: { color: '#6b6461' },
                            min: 0,
                            max: axisBounds.yMax
                        }
                    },
                    onClick: (e, elements) => {
                        if (elements.length) {
                            const dataset = chart.data.datasets[elements[0].datasetIndex];
                            if (dataset.kind === 'models') {
                                showModal(dataset.data[elements[0].index].model);
                            }
                        }
                    }
                },
                plugins: [{
                    afterDatasetsDraw: chart => {
                        if (labelMode === 'none') return;
                        const ctx = chart.ctx;
                        chart.data.datasets.forEach((ds, i) => {
                            if (ds.kind !== 'models') return;
                            chart.getDatasetMeta(i).data.forEach((el, idx) => {
                                const m = ds.data[idx].model;
                                const isPareto = paretoNames.has(m.name);
                                if (labelMode === 'frontier' && !isPareto) return;

                                ctx.save();
                                ctx.fillStyle = isPareto ? '#1a1819' : '#9b8b88';
                                ctx.font = isPareto ? 'bold 10px sans-serif' : '9px sans-serif';
                                ctx.textAlign = 'center';
                                ctx.shadowColor = 'rgba(255,255,255,0.9)';
                                ctx.shadowBlur = 4;
                                ctx.fillText(m.name, el.x, el.y - 12);
                                ctx.restore();
                            });
                        });
                    }
                }]
            });
        }

        function updateChart() {
            currentXAxis = document.getElementById('xAxisSelect').value;
            currentQuarterIndex = Number(document.getElementById('quarterSlider').value || currentQuarterIndex);
            if (chart) chart.destroy();
            createChart();
        }

        function showModal(model) {
            const config = getMetricConfig();
            const xConfig = getXAxisConfig();
            const isPareto = currentParetoNames.has(model.name);

            document.getElementById('modalBody').innerHTML = `
                <h2>${model.name}${isPareto ? '<span class="pareto-badge">Pareto Optimal</span>' : ''}</h2>
                <p class="provider">${model.provider}</p>
                <div class="stats-grid">
                    <div class="stat-card highlight">
                        <div class="stat-label">${config.label}</div>
                        <div class="stat-value">${model[config.field]?.toFixed?.(2) || model[config.field] || 'N/A'}</div>
                    </div>
                    <div class="stat-card highlight">
                        <div class="stat-label">${xConfig.label}</div>
                        <div class="stat-value">${formatValue(xValue(model), xConfig.precision, xConfig.unit)}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Blended Price</div>
                        <div class="stat-value">${formatValue(model.cost, 3, '$')}/M</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Index Cost</div>
                        <div class="stat-value">${formatValue(model.index_cost, 2, '$')}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Intelligence</div>
                        <div class="stat-value">${model.intelligence?.toFixed?.(1) || 'N/A'}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Coding</div>
                        <div class="stat-value">${model.coding_index?.toFixed?.(1) || 'N/A'}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Math</div>
                        <div class="stat-value">${model.math_index?.toFixed?.(1) || 'N/A'}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">LiveCodeBench</div>
                        <div class="stat-value">${model.livecodebench?.toFixed?.(3) || 'N/A'}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">GPQA</div>
                        <div class="stat-value">${model.gpqa?.toFixed?.(3) || 'N/A'}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Release Date</div>
                        <div class="stat-value">${model.release_date || 'N/A'}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Input Price</div>
                        <div class="stat-value">$${model.input_price}/M</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Output Price</div>
                        <div class="stat-value">$${model.output_price}/M</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Speed</div>
                        <div class="stat-value">${parseFloat(model.tokens_per_sec).toFixed(0) || 'N/A'} tok/s</div>
                    </div>
                </div>
            `;
            document.getElementById('modal').classList.add('active');
        }

        function closeModal() { document.getElementById('modal').classList.remove('active'); }

        document.getElementById('modal').onclick = e => { if (e.target.id === 'modal') closeModal(); };
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

        document.getElementById('scaleSelect').onchange = updateChart;
        document.getElementById('xAxisSelect').onchange = updateChart;
        document.getElementById('frontierModeSelect').onchange = updateChart;
        document.getElementById('quarterSlider').oninput = updateChart;
        document.getElementById('showModels').onchange = updateChart;
        document.getElementById('showPareto').onchange = updateChart;
        document.getElementById('labelMode').onchange = updateChart;
        document.getElementById('providerFilter').onchange = updateChart;

        updateQuarterControls();
        createChart();"""


def ensure_x_axis_control(html: str) -> str:
    if 'id="xAxisSelect"' in html:
        return html

    marker = """                <div class="control-group">
                    <input type="checkbox" id="showPareto" checked>"""
    if marker not in html:
        raise RuntimeError("Could not find controls block for x-axis selector insertion")
    return html.replace(marker, X_AXIS_CONTROL_HTML + marker, 1)


def ensure_model_visibility_control(html: str) -> str:
    if 'id="showModels"' in html:
        return html

    marker = """                <div class="control-group">
                    <input type="checkbox" id="showPareto" checked>"""
    if marker not in html:
        raise RuntimeError("Could not find controls block for model visibility insertion")
    return html.replace(marker, MODEL_VISIBILITY_CONTROL_HTML + marker, 1)


def ensure_frontier_history_controls(html: str) -> str:
    if 'id="frontierModeSelect"' in html:
        return html

    marker = """                <div class="control-group">
                    <input type="checkbox" id="showPareto" checked>
                    <label for="showPareto">Pareto Frontier</label>
                </div>
"""
    if marker not in html:
        raise RuntimeError("Could not find Pareto control block for history controls insertion")
    return html.replace(marker, marker + FRONTIER_HISTORY_CONTROL_HTML, 1)


def ensure_x_axis_config_const(html: str) -> str:
    if re.search(r"^\s*const xAxisConfig =", html, re.MULTILINE):
        return html

    pattern = re.compile(r"^(\s*const metricsConfig = .*?;\s*)$", re.MULTILINE)
    updated, count = pattern.subn(
        lambda match: f"{match.group(1)}\n{match.group(1).split('const', 1)[0]}const xAxisConfig = [];",
        html,
        count=1,
    )
    if count != 1:
        raise RuntimeError("Could not find metricsConfig const for xAxisConfig insertion")
    return updated


def ensure_history_data_consts(html: str) -> str:
    if not re.search(r"^\s*const quarters =", html, re.MULTILINE):
        pattern = re.compile(r"^(\s*const metricsData = .*?;\s*)$", re.MULTILINE)
        updated, count = pattern.subn(
            lambda match: f"{match.group(1)}\n{match.group(1).split('const', 1)[0]}const quarters = [];",
            html,
            count=1,
        )
        if count != 1:
            raise RuntimeError("Could not find metricsData const for quarters insertion")
        html = updated

    if not re.search(r"^\s*const quarterlyData =", html, re.MULTILINE):
        pattern = re.compile(r"^(\s*const quarters = .*?;\s*)$", re.MULTILINE)
        updated, count = pattern.subn(
            lambda match: f"{match.group(1)}\n{match.group(1).split('const', 1)[0]}const quarterlyData = {{}};",
            html,
            count=1,
        )
        if count != 1:
            raise RuntimeError("Could not find quarters const for quarterlyData insertion")
        html = updated

    return html


def ensure_client_chart_logic(html: str) -> str:
    html = ensure_x_axis_config_const(html)
    html = ensure_history_data_consts(html)
    pattern = re.compile(
        r"\n\s*function (?:fallbackProviderColor|getColor)\(provider\).*\n\s*createChart\(\);",
        re.S,
    )
    updated, count = pattern.subn("\n" + CLIENT_CHART_LOGIC, html, count=1)
    if count != 1:
        raise RuntimeError("Could not replace client chart logic")
    return updated


def generate_html(template_path: Path, data: list[dict[str, Any]]) -> str:
    html = template_path.read_text(encoding="utf-8")
    html = ensure_x_axis_control(html)
    html = ensure_model_visibility_control(html)
    html = ensure_frontier_history_controls(html)
    html = ensure_client_chart_logic(html)
    client_metrics_config = [
        {key: metric[key] for key in ("key", "label", "field")}
        for metric in METRICS_CONFIG
    ]
    quarters = build_quarters(data)

    html = replace_const(html, "rawData", data)
    html = replace_const(html, "metricsConfig", client_metrics_config)
    html = replace_const(html, "xAxisConfig", X_AXIS_CONFIG)
    html = replace_const(html, "metricsData", build_metrics_data(data))
    html = replace_const(html, "quarters", quarters)
    html = replace_const(html, "quarterlyData", build_quarterly_data(data, quarters))
    return html


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate the standalone LLM price/intelligence Pareto chart."
    )
    parser.add_argument("--env", type=Path, default=DEFAULT_ENV, help="Path to .env file")
    parser.add_argument(
        "--template",
        type=Path,
        default=DEFAULT_TEMPLATE,
        help="Existing chart HTML to use as the shell/template",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=DEFAULT_OUTPUT,
        help="Where to write the generated HTML",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    load_dotenv(args.env)

    api_key = os.environ.get("ARTIFICIAL_ANALYSIS_API_KEY")
    if not api_key:
        print(
            "Missing ARTIFICIAL_ANALYSIS_API_KEY. Add it to .env or export it.",
            file=sys.stderr,
        )
        return 2

    models = fetch_models(api_key)
    public_metadata = fetch_public_model_metadata()
    if not public_metadata:
        print(
            "Warning: could not extract public model metadata from Artificial Analysis; "
            "continuing without release-date and index-cost enrichment.",
            file=sys.stderr,
        )

    chart_data = transform_models(models, public_metadata)
    if not chart_data:
        print("No chartable LLM rows returned by Artificial Analysis.", file=sys.stderr)
        return 1

    html = generate_html(args.template, chart_data)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(html, encoding="utf-8")

    enriched_rows = sum(1 for row in chart_data if row.get("index_cost") is not None)
    dated_rows = sum(1 for row in chart_data if row.get("release_date"))
    print(
        f"Fetched {len(models)} models; enriched {enriched_rows} with index cost; "
        f"matched {dated_rows} release dates; "
        f"wrote {len(chart_data)} chart rows to {args.output}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
