"""Draw ModelGate's request routing in the site's Kiln style.

Usage: python3 scripts/modelgate_diagram.py [output-directory]
Defaults to cv/build/modelgate for local review; writes EN/RU HTML, PNG and WebP.
Needs ~/Desktop/Kiln (or KILN), installed IBM Plex fonts and google-chrome.
Provider names and routing policies are deliberately omitted: only the confirmed
API gateway, model/provider selection and response flow are shown.
"""
import os
from pathlib import Path
import subprocess
import sys

KILN = Path(os.environ.get("KILN", Path.home() / "Desktop/Kiln"))
os.environ.setdefault("KILN_FONT_DIR", str(Path.home() / ".local/share/fonts/kiln"))
sys.path.insert(0, str(KILN / "tools"))
import sheet as K  # noqa: E402
from PIL import Image  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
W, H = 2000, 860
TEXT = {
    "ru": dict(
        client="Приложение", client_sub="один интерфейс API",
        request="запрос", gateway="Единый API-шлюз",
        route="Выбор модели", route_sub="и провайдера",
        tag="МАРШРУТИЗИРУЕТ", providers="API провайдеров",
        provider="Провайдер", selected="выбранный маршрут",
        response="Ответ", response_sub="результат модели",
        return_label="ответ через ModelGate",
        caption="Схема маршрутизации: запрос проходит через единый API-шлюз к выбранной модели и провайдеру; ответ возвращается приложению. Показан один маршрут, число провайдеров условное.",
    ),
    "en": dict(
        client="Application", client_sub="one API interface",
        request="request", gateway="Unified API gateway",
        route="Model selection", route_sub="and provider selection",
        tag="ROUTES", providers="Provider APIs",
        provider="Provider", selected="selected route",
        response="Response", response_sub="returned to the application",
        return_label="response via ModelGate",
        caption="Request routing: a unified API gateway forwards a request to the selected model and provider, then returns the response to the application. One route is shown; the provider count is illustrative.",
    ),
}


def text(x, y, value, size=28, weight=400, color=K.INK, anchor="start"):
    return K.T(x, y, value, K.SA, size, weight, color, anchor)


def icon(name, x, y, w, h):
    return f'<image href="{K.icon_uri(name, quiet=True)}" x="{x}" y="{y}" width="{w}" height="{h}"/>'


def arrow(path, color=K.INK):
    marker = "ae" if color == K.E else "a"
    return K.P(path, color, 3, f'marker-end="url(#{marker})"')


def diagram(lang):
    s = TEXT[lang]
    o = K.defs()
    o += icon("program_files", 60, 215, 290, 230)
    o += text(60, 500, s["client"], 34, 600)
    o += text(60, 540, s["client_sub"], 26, color=K.INK2)
    o += arrow("M370,340 L484,340")
    o += text(425, 316, s["request"], 24, anchor="middle")

    # The gateway is the single orange component; the provider icons stay quiet.
    o += K.R(500, 150, 610, 420, K.PAGE, K.E, 4, rx=12)
    o += K.R(526, 132, 280, 36, K.E, rx=4)
    o += K.T(542, 157, s["tag"], K.MA, 19, 600, K.PAGE)
    o += text(532, 220, "ModelGate", 44, 600, K.ED)
    o += text(532, 264, s["gateway"], 28, color=K.INK2)
    o += icon("rack", 532, 302, 172, 155)
    o += text(744, 353, s["route"], 34, 600)
    o += text(744, 394, s["route_sub"], 30)
    o += K.T(532, 530, "Python · LLM API", K.MA, 21, 500, K.INK2)

    o += text(1260, 98, s["providers"], 32, 600)
    for i, y in enumerate((135, 285, 435)):
        o += K.R(1260, y, 330, 110, K.PAGE, K.RULE, 1.5, rx=10)
        o += icon("model", 1274, y + 10, 90, 90)
        o += text(1380, y + 63, f'{s["provider"]} {chr(65 + i)}', 30, 600)
    # A single selected path, with alternatives drawn as inactive branches.
    o += K.P("M1126,340 L1190,340 L1190,190 L1244,190", K.RULE, 2)
    o += K.P("M1190,340 L1190,490 L1244,490", K.RULE, 2)
    o += arrow("M1126,340 L1244,340")
    o += text(1185, 602, s["selected"], 24, color=K.INK2, anchor="middle")
    o += K.L(1190, 565, 1190, 356, K.RULE, 1.5)

    o += arrow("M1606,340 L1704,340")
    o += icon("message", 1730, 245, 220, 190)
    o += text(1720, 500, s["response"], 34, 600)
    o += text(1720, 540, s["response_sub"], 24, color=K.INK2)
    o += arrow("M1830,580 L1830,715 L205,715 L205,585")
    o += text(1000, 758, s["return_label"], 26, color=K.INK2, anchor="middle")
    return o


if __name__ == "__main__":
    out = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else ROOT / "cv/build/modelgate"
    out.mkdir(parents=True, exist_ok=True)
    for lang, strings in TEXT.items():
        body = diagram(lang)
        html = out / f"modelgate-{lang}.html"
        png = out / f"modelgate-{lang}.png"
        K.page([body], str(html), "ModelGate", w=W, h=H)
        subprocess.run([
            "google-chrome", "--headless=new", "--no-sandbox", "--disable-gpu",
            "--hide-scrollbars", "--force-device-scale-factor=2",
            "--virtual-time-budget=2000", f"--window-size={W},{H}",
            f"--screenshot={png}", html.as_uri(),
        ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        with Image.open(png) as image:
            image = image.convert("RGB").resize((2400, 1032), Image.Resampling.LANCZOS)
            image.save(png)
            image.save(out / f"modelgate-{lang}.webp", quality=90, method=6)
        # Keep the caveat with the editable preview, outside the figure itself.
        content = html.read_text()
        caption = '<p style="max-width:1100px;margin:24px auto;font:20px/1.5 sans-serif;color:#605a52">' + strings["caption"] + '</p>'
        html.write_text(content.replace("</body>", caption + "</body>"))
        print(png)
