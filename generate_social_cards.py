#!/usr/bin/env python3
"""Generate per-post and per-project social cards (1200x630 webp)."""

from PIL import Image, ImageDraw, ImageFont
import os, textwrap

W, H = 1200, 630
SYNE = "/tmp/syne-bold.ttf"
UBUNTU = "/usr/share/fonts/truetype/ubuntu/Ubuntu[wdth,wght].ttf"
UBUNTU_SANS = "/usr/share/fonts/truetype/ubuntu/UbuntuSans[wdth,wght].ttf"

BG        = (245, 241, 235)   # #f5f1eb
DARK      = (26, 26, 46)      # #1a1a2e
MID       = (100, 95, 88)     # muted text

BLOG_ACCENT  = (123, 45, 63)   # #7b2d3f  burgundy
PROJ_ACCENT  = (13, 148, 99)   # #0d9463  green
BLOG_SOFT    = (247, 235, 238) # light burgundy tint
PROJ_SOFT    = (230, 248, 241) # light green tint

CARDS = [
    # (output_path, label, title, accent, soft)
    (
        "assets/blog/llms-not-just-statistics-card.webp",
        "Writing",
        'The “LLMs are just statistics” argument is stuck in 2022',
        BLOG_ACCENT, BLOG_SOFT,
    ),
    (
        "assets/blog/prefix-injection-jailbreak-card.webp",
        "Writing",
        "A psychology trick beats LLM jailbreak defenses",
        BLOG_ACCENT, BLOG_SOFT,
    ),
    (
        "assets/blog/llms-trained-to-guess-card.webp",
        "Writing",
        "LLMs are trained to guess",
        BLOG_ACCENT, BLOG_SOFT,
    ),
    (
        "assets/blog/pareto-llm-pricing-card.webp",
        "Writing",
        "Most LLMs are strictly dominated",
        BLOG_ACCENT, BLOG_SOFT,
    ),
    (
        "assets/blog/cli-vs-mcp-card.webp",
        "Writing",
        "Agents don't need MCP. They need CLI.",
        BLOG_ACCENT, BLOG_SOFT,
    ),
    (
        "assets/idea-evolve/social-card.webp",
        "Open Source",
        "Idea Evolve: Multi-Agent Evolutionary Framework",
        PROJ_ACCENT, PROJ_SOFT,
    ),
]

def load_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default(size)

def wrap_title(draw, text, font, max_width):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        test = (current + " " + word).strip()
        bbox = draw.textbbox((0, 0), test, font=font)
        if bbox[2] - bbox[0] <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines

def make_card(path, label, title, accent, soft):
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)

    # Soft tinted panel — top strip
    panel_h = 10
    draw.rectangle([(0, 0), (W, panel_h)], fill=accent)

    # Left accent bar
    bar_w = 8
    draw.rectangle([(0, panel_h), (bar_w, H)], fill=accent)

    # Soft background pill for label
    label_font = load_font(UBUNTU_SANS, 22)
    lpad = 14
    label_bbox = draw.textbbox((0, 0), label.upper(), font=label_font)
    lw = label_bbox[2] - label_bbox[0]
    pill_x1, pill_y1 = 64, 68
    pill_x2, pill_y2 = pill_x1 + lw + lpad * 2, pill_y1 + 34
    draw.rounded_rectangle([(pill_x1, pill_y1), (pill_x2, pill_y2)], radius=6, fill=soft)
    draw.text((pill_x1 + lpad, pill_y1 + 7), label.upper(), font=label_font, fill=accent)

    # Title
    title_font = load_font(SYNE, 72)
    max_title_w = W - 64 - bar_w - 80
    lines = wrap_title(draw, title, title_font, max_title_w)

    # If more than 2 lines, shrink
    if len(lines) > 2:
        title_font = load_font(SYNE, 56)
        lines = wrap_title(draw, title, title_font, max_title_w)
    if len(lines) > 3:
        title_font = load_font(SYNE, 44)
        lines = wrap_title(draw, title, title_font, max_title_w)

    line_h = title_font.size + 12
    total_text_h = len(lines) * line_h
    # Vertically center between label bottom and author top
    title_y = pill_y2 + max(40, (H - 120 - pill_y2 - total_text_h) // 2)

    for line in lines:
        draw.text((64 + bar_w + 10, title_y), line, font=title_font, fill=DARK)
        title_y += line_h

    # Bottom: author + URL
    name_font  = load_font(UBUNTU_SANS, 26)
    url_font   = load_font(UBUNTU_SANS, 22)
    draw.text((64 + bar_w + 10, H - 90), "Aleksander Borodin", font=name_font, fill=DARK)
    draw.text((64 + bar_w + 10, H - 56), "aleksanderborodin.github.io", font=url_font, fill=accent)

    # Subtle dot grid decoration (top-right corner)
    dot_r = 2
    dot_spacing = 18
    for row in range(7):
        for col in range(9):
            cx = W - 80 - col * dot_spacing
            cy = 60 + row * dot_spacing
            draw.ellipse([(cx - dot_r, cy - dot_r), (cx + dot_r, cy + dot_r)], fill=(*accent, 40) if False else accent)
    # Draw dots with low opacity by compositing
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    odraw = ImageDraw.Draw(overlay)
    for row in range(7):
        for col in range(9):
            cx = W - 80 - col * dot_spacing
            cy = 60 + row * dot_spacing
            odraw.ellipse([(cx - dot_r, cy - dot_r), (cx + dot_r, cy + dot_r)], fill=(*accent, 35))
    img = img.convert("RGBA")
    img = Image.alpha_composite(img, overlay)
    img = img.convert("RGB")

    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path, "webp", quality=92)
    print(f"  saved {path}")

base = "/home/sasha/Desktop/personal_website/"
for (rel_path, label, title, accent, soft) in CARDS:
    make_card(base + rel_path, label, title, accent, soft)

print("Done.")
