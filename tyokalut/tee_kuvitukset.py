#!/usr/bin/env python3
"""Geneeriset SVG-kuvitukset ja faviconit näyttöprojektin sivustolle.

Ajo:  python3 tyokalut/tee_kuvitukset.py
Vaatii faviconeille Pillow'n (pip install Pillow). SVG:t syntyvät ilman sitä.

Kaikki tekstit ja värit luetaan kuvitukset.json-tiedostosta repositoryn juuresta.
Tähän tiedostoon ei kirjoiteta projektikohtaista sisältöä.

kuvitukset.json:
{
  "aksentti": "#2e7d32",
  "aksenttiTumma": "#1b5e20",
  "vaihevarit": ["#8d5a2b", "#1a6fae", "#c03434", "#7c3aed"],
  "tyokierto":   ["Luonnos", "Työkalu", "Projektiin", "Testi", "Commit"],
  "vaiheet":     [["A", "Ydin"], ["B", "Featuret"], ["C", "Valmiiksi"], ["D", "Julkaisu"]],
  "suunnitelma": ["Tavoite ja kohde", "Omat päätökset", "Sisältölista"],
  "testaus":     ["Suunnittele testi", "Aja testi", "Löydä virhe", "Korjaa", "Uusintatesti"],
  "tekoaly":     ["Kysy", "Tarkista", "Testaa", "Kirjaa"],
  "tunnus":      "kolmio"          # kolmio | ympyra | neliot | nuoli
}
"""
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
OUT = os.path.join(ROOT, "assets")
os.makedirs(OUT, exist_ok=True)

with open(os.path.join(ROOT, "kuvitukset.json"), encoding="utf-8") as fh:
    CFG = json.load(fh)

ACCENT = CFG.get("aksentti", "#2e7d32")
ACCENT_D = CFG.get("aksenttiTumma", "#1b5e20")
PHASE = CFG.get("vaihevarit", ["#8d5a2b", "#1a6fae", "#c03434", "#7c3aed"])

BG = "#26323b"
PANEL = "#33424d"
PANEL2 = "#3c4d5a"
LINE = "#5b6f7d"
TXT = "#eceff1"
TXT2 = "#b0bec5"
GOLD = "#ffb800"
FONT = "Inter,'Segoe UI',system-ui,sans-serif"


def rect(x, y, w, h, fill, r=0, extra=""):
    rr = f' rx="{r:g}"' if r else ""
    return f'<rect x="{x:g}" y="{y:g}" width="{w:g}" height="{h:g}" fill="{fill}"{rr} {extra}/>'


def esc(s):
    """SVG on XML: &, < ja > on pakko suojata tai koko kuva jää renderöitymättä."""
    return (str(s).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))


def text(x, y, s, size=26, fill=TXT, weight=800, anchor="middle", spacing="0.02em"):
    return (f'<text x="{x:g}" y="{y:g}" font-family="{FONT}" font-size="{size:g}" '
            f'font-weight="{weight}" fill="{fill}" text-anchor="{anchor}" '
            f'letter-spacing="{spacing}">{esc(s)}</text>')


def arrow(x, y, size, color=GOLD):
    """Kulmikas nuoli oikealle, korkeus size."""
    u = size / 5
    return "".join([
        rect(x, y + 2 * u, 3 * u, u, color),
        rect(x + 3 * u, y + u, u, 3 * u, color),
        rect(x + 4 * u, y + 2 * u, u, u, color),
    ])


def badge(cx, cy, r, label, color):
    return (rect(cx - r, cy - r, 2 * r, 2 * r, color, r=r * 0.35)
            + text(cx, cy + r * 0.35, label, size=r * 1.15, fill="#ffffff"))


def wrap(s, width):
    """Katkaisee otsikon kahdelle riville sanarajalta."""
    if len(s) <= width:
        return [s]
    words, lines, cur = s.split(), [], ""
    for w in words:
        if len(cur) + len(w) + 1 <= width:
            cur = f"{cur} {w}".strip()
        else:
            lines.append(cur)
            cur = w
    lines.append(cur)
    return lines[:2]


def svg(w, h, body, title):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
            f'width="{w}" height="{h}" role="img" aria-label="{title}">'
            f'<title>{title}</title>{rect(0, 0, w, h, BG)}{body}</svg>')


def save(name, content):
    with open(os.path.join(OUT, name), "w", encoding="utf-8") as fh:
        fh.write(content)
    print(name, len(content), "B")


def panel_lines(x, y, w, count, gap=18, color=LINE, short_last=True):
    """Tekstiä esittävät viivat panelin sisällä."""
    parts = []
    for i in range(count):
        lw = w * (0.55 if (short_last and i == count - 1) else 1.0)
        parts.append(rect(x, y + i * gap, lw, 6, color, r=3))
    return "".join(parts)


# ---------- 1. tyokierto.svg (1672x941) — hero ----------
def draw_tyokierto():
    W, H = 1672, 941
    steps = CFG.get("tyokierto", ["Luonnos", "Työ", "Testi", "Commit"])
    n = len(steps)
    pad, gap = 90, 46
    cw = (W - 2 * pad - (n - 1) * gap) / n
    b = [text(W / 2, 92, CFG.get("tyokiertoOtsikko", "TYÖKIERTO"), size=30, fill=TXT2, spacing="0.28em")]
    top, ch = 170, 560
    for i, step in enumerate(steps):
        x = pad + i * (cw + gap)
        b.append(rect(x, top, cw, ch, PANEL, r=18))
        b.append(rect(x, top, cw, 10, PHASE[i % len(PHASE)], r=5))
        b.append(badge(x + cw / 2, top + 130, 46, str(i + 1), PHASE[i % len(PHASE)]))
        # kuvake: kasvava pinon korkeus vaiheen mukaan
        bars = i + 2
        bw = min(46, (cw - 80) / bars)
        for k in range(bars):
            bh = 60 + k * 34
            b.append(rect(x + cw / 2 - (bars * bw) / 2 + k * bw + 4, top + 400 - bh, bw - 8, bh,
                          PANEL2 if k < bars - 1 else ACCENT, r=4))
        for j, line in enumerate(wrap(step, 16)):
            b.append(text(x + cw / 2, top + 470 + j * 40, line, size=34))
        if i < n - 1:
            b.append(arrow(x + cw + (gap - 30) / 2, top + ch / 2 - 15, 30))
    b.append(text(W / 2, H - 70, " → ".join(steps), size=26, fill=TXT2, weight=600))
    save("tyokierto.svg", svg(W, H, "".join(b), CFG.get("tyokiertoAlt", "Työkierron vaiheet")))


# ---------- 2. vaiheet.svg (1129x369) ----------
def draw_vaiheet():
    W, H = 1129, 369
    phases = CFG.get("vaiheet", [["A", "Ydin"], ["B", "Featuret"], ["C", "Valmiiksi"], ["D", "Julkaisu"]])
    n = len(phases)
    pad, gap = 40, 26
    cw = (W - 2 * pad - (n - 1) * gap) / n
    b = []
    for i, (tag, name) in enumerate(phases):
        x = pad + i * (cw + gap)
        color = PHASE[i % len(PHASE)]
        b.append(rect(x, 60, cw, 250, PANEL, r=14))
        b.append(rect(x, 60, cw, 8, color, r=4))
        b.append(badge(x + cw / 2, 130, 34, tag, color))
        for j, line in enumerate(wrap(name, 14)):
            b.append(text(x + cw / 2, 205 + j * 32, line, size=27))
        b.append(panel_lines(x + 26, 262, cw - 52, 2, gap=14))
        if i < n - 1:
            b.append(arrow(x + cw + (gap - 22) / 2, 175, 22))
    save("vaiheet.svg", svg(W, H, "".join(b), CFG.get("vaiheetAlt", "Projektin vaiheet")))


# ---------- 3. suunnitelma-luonnos.svg (1128x540) ----------
def draw_suunnitelma():
    W, H = 1128, 540
    parts = CFG.get("suunnitelma", ["Tavoite", "Päätökset", "Sisältölista"])
    n = len(parts)
    pad, gap = 70, 40
    cw = (W - 2 * pad - (n - 1) * gap) / n
    b = [text(W / 2, 70, CFG.get("suunnitelmaOtsikko", "SUUNNITELMA SYNTYY ENNEN TOTEUTUSTA"),
              size=26, fill=TXT2, spacing="0.2em")]
    for i, part in enumerate(parts):
        x = pad + i * (cw + gap)
        lines = wrap(part, 18)
        # Otsikkopalkin korkeus elaa rivimaaran mukaan, jotta pitka otsikko ei valu
        # palkin ulkopuolelle vaalealle pohjalle.
        hh = 28 + len(lines) * 26
        b.append(rect(x, 120, cw, 340, "#f6f7f4", r=10))
        b.append(rect(x, 120, cw, hh, PANEL2, r=10))
        b.append(rect(x, 120 + hh - 14, cw, 14, PANEL2))
        for j, line in enumerate(lines):
            b.append(text(x + cw / 2, 155 + j * 26, line, size=23, fill=TXT))
        b.append(panel_lines(x + 30, 140 + hh + 16, cw - 60, 7, gap=26, color="#c9d2cb"))
        b.append(rect(x + 30, 410, 90, 26, ACCENT, r=13))
        b.append(text(x + 75, 429, "OMA", size=17, fill="#ffffff"))
    save("suunnitelma-luonnos.svg", svg(W, H, "".join(b), CFG.get("suunnitelmaAlt", "Suunnitelman osat")))


# ---------- 4. testauskierros.svg (1500x1000) ----------
def draw_testaus():
    W, H = 1500, 1000
    steps = CFG.get("testaus", ["Suunnittele testi", "Aja testi", "Löydä virhe", "Korjaa", "Uusintatesti"])
    b = [text(W / 2, 80, "TESTAUSKIERROS", size=30, fill=TXT2, spacing="0.28em")]
    # Kierto: 5 solmua suorakulmaisella radalla
    slots = [(180, 180), (620, 180), (1060, 180), (1060, 620), (180, 620)]
    bw, bh = 360, 200
    for i, step in enumerate(steps[:5]):
        x, y = slots[i]
        color = PHASE[i % len(PHASE)]
        b.append(rect(x, y, bw, bh, PANEL, r=16))
        b.append(rect(x, y, bw, 9, color, r=5))
        b.append(badge(x + 52, y + 70, 34, str(i + 1), color))
        for j, line in enumerate(wrap(step, 15)):
            b.append(text(x + bw / 2, y + 140 + j * 36, line, size=32))
    # nuolet solmujen välillä
    b.append(arrow(500, 265, 34))
    b.append(arrow(940, 265, 34))
    b.append(rect(1235, 380, 10, 220, GOLD))
    b.append(arrow(1215, 590, 34))
    b.append(rect(560, 700, 500, 10, GOLD))
    b.append(text(W / 2, 780, "Testi on valmis vasta onnistuneen uusintatestin jälkeen.",
                  size=30, fill=TXT2, weight=600))
    b.append(rect(240, 380, 10, 220, GOLD))
    b.append(text(W / 2, 900, "Kirjaa odotettu tulos ennen ajoa. Havainto, syy, korjaus ja uusintatesti kirjataan aina.",
                  size=25, fill=TXT2, weight=500))
    save("testauskierros.svg", svg(W, H, "".join(b), CFG.get("testausAlt", "Testauskierros")))


# ---------- 5. tekoalyapu.svg (1500x1000) ----------
def draw_tekoaly():
    W, H = 1500, 1000
    steps = CFG.get("tekoaly", ["Kysy", "Tarkista", "Testaa", "Kirjaa"])
    notes = CFG.get("tekoalyTekstit", [
        "Muotoile kysymys omin sanoin.",
        "Vertaa dokumentaatioon.",
        "Aja testi itse.",
        "Kirjaa käyttö ja oppi.",
    ])
    b = [text(W / 2, 80, CFG.get("tekoalyOtsikkoIso", "TEKOÄLY ON APUVÄLINE, PÄÄTÖS ON SINUN"), size=30, fill=TXT2, spacing="0.2em")]
    pad, gap = 90, 40
    cw = (W - 2 * pad - 3 * gap) / 4
    for i, step in enumerate(steps[:4]):
        x = pad + i * (cw + gap)
        color = PHASE[i % len(PHASE)]
        b.append(rect(x, 160, cw, 460, PANEL, r=18))
        b.append(rect(x, 160, cw, 10, color, r=5))
        b.append(badge(x + cw / 2, 250, 44, "0" + str(i + 1), color))
        for j, line in enumerate(wrap(step, 12)):
            b.append(text(x + cw / 2, 360 + j * 40, line, size=38))
        b.append(panel_lines(x + 34, 440, cw - 68, 4, gap=26))
        if i < 3:
            b.append(arrow(x + cw + (gap - 26) / 2, 380, 26))
    for i, note in enumerate(notes[:4]):
        x = pad + i * (cw + gap)
        for j, line in enumerate(wrap(note, 22)):
            b.append(text(x + cw / 2, 690 + j * 32, line, size=24, fill=TXT2, weight=600))
    b.append(rect(pad, 830, W - 2 * pad, 100, PANEL2, r=14))
    b.append(text(W / 2, 875, CFG.get("tekoalyMuistutus", "Ydinosaaminen tehdään itse."),
                  size=28, fill=TXT))
    b.append(text(W / 2, 908, "Merkittävä tekoälyapu kirjataan AI-lokiin aineistoviitteen kanssa.",
                  size=23, fill=TXT2, weight=600))
    save("tekoalyapu.svg", svg(W, H, "".join(b), CFG.get("tekoalyAlt", "Tekoälyn käytön neljä askelta")))


# ---------- 6. ai-modified-badge.svg ----------
def draw_badge():
    W, H = 84, 28
    b = [rect(0, 0, W, H, "#eceff1", r=6),
         rect(0, 0, 4, H, ACCENT),
         text(W / 2 + 2, 18, "AI-muokattu", size=11, fill="#37474f", weight=700)]
    save("ai-modified-badge.svg",
         f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" '
         f'role="img" aria-label="Sisältöä on muokattu tekoälyllä"><title>Sisältöä on muokattu tekoälyllä</title>'
         + "".join(b) + "</svg>")


# ---------- Faviconit ----------
def draw_favicons():
    try:
        from PIL import Image, ImageDraw
    except ImportError:
        print("Pillow puuttuu — faviconit jäivät tekemättä (pip install Pillow)")
        return

    def hex_rgb(h):
        h = h.lstrip("#")
        return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))

    shape = CFG.get("tunnus", "kolmio")

    def mark(px):
        img = Image.new("RGBA", (px, px), hex_rgb(ACCENT_D) + (255,))
        d = ImageDraw.Draw(img)
        u = px / 8
        light = hex_rgb(ACCENT) + (255,)
        white = (255, 255, 255, 235)
        if shape == "ympyra":
            d.ellipse([u * 1.5, u * 1.5, px - u * 1.5, px - u * 1.5], fill=light)
            d.ellipse([u * 3, u * 3, px - u * 3, px - u * 3], fill=white)
        elif shape == "neliot":
            d.rectangle([u, u, u * 3.5, u * 3.5], fill=light)
            d.rectangle([u * 4.5, u, u * 7, u * 3.5], fill=white)
            d.rectangle([u, u * 4.5, u * 3.5, u * 7], fill=white)
            d.rectangle([u * 4.5, u * 4.5, u * 7, u * 7], fill=light)
        elif shape == "nuoli":
            d.polygon([(u * 1.5, u * 2), (u * 5, u * 4), (u * 1.5, u * 6)], fill=white)
            d.rectangle([u * 5.5, u * 2, u * 6.8, u * 6], fill=light)
        else:  # kolmio
            d.polygon([(u * 4, u * 1.6), (u * 6.8, u * 6.4), (u * 1.2, u * 6.4)], fill=light)
            d.polygon([(u * 4, u * 3.2), (u * 5.6, u * 5.9), (u * 2.4, u * 5.9)], fill=white)
        return img

    mark(16).save(f"{OUT}/favicon-16.png")
    mark(32).save(f"{OUT}/favicon-32.png")
    mark(180).save(f"{OUT}/apple-touch-icon.png")
    mark(48).save(f"{OUT}/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    print("faviconit ok")


if __name__ == "__main__":
    draw_tyokierto()
    draw_vaiheet()
    draw_suunnitelma()
    draw_testaus()
    draw_tekoaly()
    draw_badge()
    draw_favicons()
