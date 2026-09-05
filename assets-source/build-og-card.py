"""Rebuilds public/media/og-cover.jpg from the hero image. Run after changing the hero art or the thesis."""
from PIL import Image, ImageDraw, ImageFont
import os

PAPER=(247,242,226); INK=(27,25,23); MUTED=(109,103,92); RED=(200,58,30)
W,H = 1200,630
IS = '.tmpwork/PlusJakartaSans.ttf'
JB = '.tmpwork/JetBrainsMono.ttf'

def f(path, size, wght=None):
    ft = ImageFont.truetype(path, size)
    if wght is not None:
        try: ft.set_variation_by_axes([wght])
        except Exception: pass
    return ft

hero = Image.open('public/media/chrisben-hero.webp').convert('RGBA')
canvas = Image.new('RGB', (W,H), PAPER)

ph = int(H*1.04); pw = round(hero.width*ph/hero.height)
p = hero.resize((pw,ph), Image.LANCZOS)
canvas.paste(p, (W-pw-40, (H-ph)//2), p)

d = ImageDraw.Draw(canvas)
x0 = 72
d.text((x0,60), "[ FIELD NOTES / 2026 ]", font=f(JB,17,500), fill=MUTED)
y = 138
for line in ["I'm trying to figure out","what technology","can actually do."]:
    d.text((x0,y), line, font=f(IS,52,600), fill=INK); y += 62
d.line([(x0,y+26),(x0+56,y+26)], fill=RED, width=3)
d.text((x0,y+52), "LEO CHRISBEN EVANS", font=f(JB,19,600), fill=INK)
d.text((x0,y+82), "SOFTWARE ENGINEER  ·  DATA SCIENCE  ·  NAIROBI", font=f(JB,15,400), fill=MUTED)
d.line([(0,H-4),(W,H-4)], fill=INK, width=8)

canvas.save('public/media/og-cover.jpg', quality=90, optimize=True, progressive=True)
canvas.resize((700,368), Image.LANCZOS).save('.tmpwork/og-preview.png')
print('og-cover.jpg', round(os.path.getsize('public/media/og-cover.jpg')/1024), 'kB')
