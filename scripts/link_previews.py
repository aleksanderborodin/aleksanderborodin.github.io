"""Link-preview images (1200 × 630) for every page, after Kiln section 16 (identity).

Layout from Kiln/tools/preview.py: mark top left, mono label, two-line title, author, one hero 3D icon.
Russian pages use the АБ mark and the Russian author line.

Usage: python3 scripts/link_previews.py
Needs the Kiln folder (KILN env var, default ~/Desktop/Kiln/Kiln) and JetBrains Mono
static TTFs (FONT_DIR env var, default ~/.local/share/fonts/kiln).
"""
import os, sys

KILN = os.environ.get("KILN", os.path.expanduser("~/Desktop/Kiln/Kiln"))
os.environ.setdefault("FONT_DIR", os.path.expanduser("~/.local/share/fonts/kiln"))
sys.path.insert(0, os.path.join(KILN, "tools"))
from PIL import Image, ImageDraw  # noqa: E402
from preview import F, mark, PAPER, INK, MUT  # noqa: E402
import icons3d  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "og")
AUTHOR = {"en": "Alexander Borodin", "ru": "Александр Бородин"}
MARK = {"en": "AB", "ru": "АБ"}


def card(lang, label, line1, line2, scene, icon_box=(700, 70, 460, 490)):
    """Kiln's preview template, with the mark and author in the page's language."""
    im = Image.new("RGB", (1200, 630), PAPER)
    d = ImageDraw.Draw(im)
    x, y, w, h = icon_box
    im.paste(scene.render(w, h, az=-52, el=26, light=(-0.1, -0.62, 0.78), line=3.2, pad=0.08, bg=PAPER), (x, y))
    im.paste(mark(72, t=MARK[lang]), (64, 60))
    d.text((64, 236), label.upper(), font=F("Medium", 22), fill=MUT)
    d.text((64, 272), line1, font=F("Bold", 56), fill=INK)
    d.text((64, 340), line2, font=F("Bold", 56), fill=INK)
    d.text((64, 540), AUTHOR[lang], font=F("Medium", 22), fill=MUT)
    return im


# name: (icon, {lang: (label, line1, line2)}) — titles shortened to two lines of at most 18 characters
PAGES = {
    "home": (icons3d.wrench, {
        "en": ("Projects and notes", "Alexander Borodin", "AI agents, LLMs"),
        "ru": ("Проекты и заметки", "Александр Бородин", "AI-агенты и LLM")}),
    "about": (icons3d.person, {
        "en": ("About", "Alexander Borodin", "Experience and CV"),
        "ru": ("Обо мне", "Александр Бородин", "Опыт и резюме")}),
    "writing": (icons3d.document, {
        "en": ("Writing", "Notes on LLMs", "and agents"),
        "ru": ("Блог", "Заметки об LLM", "и агентах")}),
    "idea-evolve": (icons3d.program_files, {
        "en": ("Project · Open source", "Idea Evolve:", "agents that evolve"),
        "ru": ("Проект · Open source", "Idea Evolve:", "эволюция агентов")}),
    "top-llm-benchmarks": (icons3d.dataset, {
        "en": ("Writing · Evaluation", "My top", "benchmarks"),
        "ru": ("Блог · Оценка", "Мой топ", "бэнчмарков")}),
    "cli-vs-mcp": (icons3d.terminal, {
        "en": ("Writing · Agents", "Agents don't need", "MCP. They need CLI"),
        "ru": ("Блог · Агенты", "CLI", "против MCP")}),
    "pareto-llm-pricing": (icons3d.coin, {
        "en": ("Writing · Economics", "Most LLMs are", "strictly dominated"),
        "ru": ("Блог · Экономика", "Какие LLM", "имеют смысл")}),
    "llms-trained-to-guess": (icons3d.gauge, {
        "en": ("Writing · Training", "LLMs are trained", "to guess"),
        "ru": ("Блог · Обучение", "Угадайка:", "LLM учат угадывать")}),
    "prefix-injection-jailbreak": (icons3d.message, {
        "en": ("Writing · LLM safety", "A psychology trick", "beats LLM defenses"),
        "ru": ("Блог · Безопасность", "Префиксная", "атака на LLM")}),
    "llms-not-just-statistics": (icons3d.model, {
        "en": ("Writing · Machine learning", "“Just statistics”", "is stuck in 2022"),
        "ru": ("Блог · Машинное обучение", "Не просто", "статистика")}),
}

if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for name, (scene, texts) in PAGES.items():
        for lang, (label, l1, l2) in texts.items():
            for line in (l1, l2):
                assert len(line) <= 18, (name, lang, line)
            path = os.path.join(OUT, f"{name}-{lang}.png")
            card(lang, label, l1, l2, scene()).save(path, optimize=True)
            print(os.path.relpath(path, ROOT), flush=True)
