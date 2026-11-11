"""
Genera el nuevo logo de BG Legal desde cero, replicando el estilo de la familia BG:
- Circulo negro con leve gradiente
- Swoosh purpura + linea dorada orbitando (como bg_contable / bg_emprendedor)
- Balanza dorada arriba (icono del servicio)
- 'BG' blanco bold en el centro
- 'LEGAL' en dorado abajo

Todo vectorial (PIL draw) en lienzo 1024x1024 supersampleado -> 512x512 para nitidez.
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOGOS = os.path.join(ROOT, "public", "logos")
OUT = os.path.join(LOGOS, "bg_seguros_new.png")

SS = 2                    # supersampling
SIZE = 512 * SS
C = SIZE // 2

NEGRO = (22, 22, 24)
NEGRO2 = (34, 34, 38)
PURPURA = (124, 58, 237)
PURPURA_OSC = (88, 28, 190)
DORADO = (212, 175, 55)
BLANCO = (255, 255, 255)

def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

def make_base():
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    # Circulo negro con gradiente radial sutil
    grad = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grad)
    steps = 60
    r_max = int(SIZE * 0.49)
    for i in range(steps, 0, -1):
        r = int(r_max * i / steps)
        col = lerp(NEGRO2, NEGRO, i / steps)
        gd.ellipse([C - r, C - r, C + r, C + r], fill=col + (255,))
    return grad

def draw_swoosh(img):
    """Swoosh purpura: arco grueso que envuelve al 'BG', con estela dorada."""
    layer = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)

    # Arco principal purpura: abierto a la derecha (de ~135deg a ~360+55deg)
    r_out = int(SIZE * 0.415)
    r_in = int(SIZE * 0.345)
    start, end = 135, 55   # PIL dibuja en sentido horario: 135 -> 415 (=55)
    d.arc([C - r_out, C - r_out, C + r_out, C + r_out], start, end + 360, fill=PURPURA + (255,), width=(r_out - r_in))

    # Punta afilada del swoosh en el extremo inferior derecho (como la familia)
    a_out = math.radians(end + 8)
    a_mid = math.radians(end + 26)
    a_in = math.radians(end - 6)
    p1 = (C + r_out * math.cos(a_out), C + r_out * math.sin(a_out))
    p2 = (C + (r_out + 55 * SS) * math.cos(a_mid), C + (r_out + 55 * SS) * math.sin(a_mid))
    p3 = (C + r_in * math.cos(a_in), C + r_in * math.sin(a_in))
    d.polygon([p1, p2, p3], fill=PURPURA_OSC + (255,))

    # Punta afilada superior (inicio del swoosh, mas corta)
    s_out = math.radians(start - 8)
    s_mid = math.radians(start - 22)
    s_in = math.radians(start + 6)
    q1 = (C + r_out * math.cos(s_out), C + r_out * math.sin(s_out))
    q2 = (C + (r_out + 38 * SS) * math.cos(s_mid), C + (r_out + 38 * SS) * math.sin(s_mid))
    q3 = (C + r_in * math.cos(s_in), C + r_in * math.sin(s_in))
    d.polygon([q1, q2, q3], fill=PURPURA + (255,))

    # Estelas doradas por dentro, tercio inferior derecho
    r_gold = int(SIZE * 0.315)
    d.arc([C - r_gold, C - r_gold, C + r_gold, C + r_gold], 15, 75, fill=DORADO + (255,), width=6 * SS)
    r_gold2 = int(SIZE * 0.345)
    d.arc([C - r_gold2, C - r_gold2, C + r_gold2, C + r_gold2], 22, 70, fill=DORADO + (210,), width=3 * SS)

    # Sombra suave del swoosh
    layer = layer.filter(ImageFilter.GaussianBlur(0.6 * SS))
    img.alpha_composite(layer)
    return img

def get_font(size):
    for name in ["arialbd.ttf", "Arial Bold.ttf", "segoeuib.ttf", "DejaVuSans-Bold.ttf"]:
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()

def draw_bg_text(img):
    d = ImageDraw.Draw(img)
    font = get_font(int(SIZE * 0.30))
    text = "BG"
    bbox = d.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.text((C - tw / 2 - bbox[0], SIZE * 0.47 - th / 2 - bbox[1]), text, font=font, fill=BLANCO)
    return img

def draw_scales(img):
    layer = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    cx = C
    top = int(SIZE * 0.055)
    s = SS
    gold = DORADO

    # Bola superior
    d.ellipse([cx - 9 * s, top, cx + 9 * s, top + 18 * s], fill=gold)
    # Poste
    post_top = top + 16 * s
    post_bot = top + 92 * s
    d.rectangle([cx - 4 * s, post_top, cx + 4 * s, post_bot], fill=gold)
    # Base escalonada
    d.rectangle([cx - 16 * s, post_bot, cx + 16 * s, post_bot + 7 * s], fill=gold)
    d.rectangle([cx - 26 * s, post_bot + 7 * s, cx + 26 * s, post_bot + 14 * s], fill=gold)
    # Barra
    beam_y = post_top + 8 * s
    beam_half = 68 * s
    d.line([(cx - beam_half, beam_y), (cx + beam_half, beam_y)], fill=gold, width=6 * s)
    d.ellipse([cx - beam_half - 6 * s, beam_y - 6 * s, cx - beam_half + 6 * s, beam_y + 6 * s], fill=gold)
    d.ellipse([cx + beam_half - 6 * s, beam_y - 6 * s, cx + beam_half + 6 * s, beam_y + 6 * s], fill=gold)
    # Cadenas y platos
    pan_r = 25 * s
    for sx in (-1, 1):
        ax = cx + sx * beam_half
        pan_cx, pan_cy = ax, beam_y + 56 * s
        for ex in (-pan_r + 5 * s, 0, pan_r - 5 * s):
            d.line([(ax, beam_y + 5 * s), (pan_cx + ex, pan_cy - 6 * s)], fill=gold, width=max(2, 2 * s // 2))
        d.arc([pan_cx - pan_r, pan_cy - pan_r, pan_cx + pan_r, pan_cy + pan_r], start=0, end=180, fill=gold, width=5 * s)
        d.line([(pan_cx - pan_r, pan_cy), (pan_cx + pan_r, pan_cy)], fill=gold, width=3 * s)
    img.alpha_composite(layer)
    return img

def draw_bottom_text(img):
    d = ImageDraw.Draw(img)
    font = get_font(int(SIZE * 0.075))
    text = "SEGUROS"
    # letter-spacing manual
    spacing = int(SIZE * 0.012)
    widths = []
    total = 0
    for ch in text:
        bb = d.textbbox((0, 0), ch, font=font)
        wch = bb[2] - bb[0]
        widths.append((ch, wch, bb))
        total += wch + spacing
    total -= spacing
    x = C - total / 2
    y = int(SIZE * 0.855)
    for ch, wch, bb in widths:
        d.text((x - bb[0], y - bb[1]), ch, font=font, fill=DORADO)
        x += wch + spacing
    return img

def main():
    img = make_base()
    img = draw_swoosh(img)
    img = draw_bg_text(img)
    img = draw_scales(img)
    img = draw_bottom_text(img)
    img = img.resize((SIZE // SS, SIZE // SS), Image.LANCZOS)
    img.save(OUT)
    print("OK ->", OUT)

if __name__ == "__main__":
    main()
