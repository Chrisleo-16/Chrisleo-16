from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
import numpy as np, os

SRC='assets-source/portrait-original.jpeg'
OUT='public/media'
BOX=(660,40,1170,780)          # crop "B" — head and shoulders
BLOCK=5                        # dissolve granularity, in source pixels

im = Image.open(SRC).convert('RGB').crop(BOX)
W,H = im.size
a = np.asarray(im).astype(np.float32)

# ── Shadow: the frame falls away into dark on the right, and slightly at the
#    bottom, so the figure emerges out of shadow rather than out of a rectangle.
xs = np.linspace(0,1,W)[None,:,None]
ys = np.linspace(0,1,H)[:,None,None]
shade  = np.clip(1.0 - np.clip((xs-0.54)/0.46, 0, 1)**1.25 * 0.86, 0.14, 1.0)
shade = shade * np.clip(1.0 - np.clip((ys-0.80)/0.20, 0, 1)**1.6 * 0.55, 0.45, 1.0)
a = a * shade
im = Image.fromarray(np.clip(a,0,255).astype(np.uint8))

# ── Dissolve: a coverage gradient quantised into pixel blocks, so the edges
#    break into squares instead of feathering. Right edge dissolves hardest.
gh, gw = (H + BLOCK - 1)//BLOCK, (W + BLOCK - 1)//BLOCK
gx = np.linspace(0,1,gw)[None,:]
gy = np.linspace(0,1,gh)[:,None]

cover  = 1.0 - np.clip((gx-0.56)/0.44, 0, 1)**1.05          # right
cover = cover * (1.0 - np.clip((0.085-gx)/0.085, 0, 1)**0.8)              # left lip
cover = cover * (1.0 - np.clip((gy-0.82)/0.18, 0, 1)**1.1)           # bottom
cover = cover * (1.0 - np.clip((0.05-gy)/0.05, 0, 1)**0.8)              # top lip

rng = np.random.default_rng(16)
mask = (cover > rng.random((gh,gw))).astype(np.uint8)*255
mask = np.kron(mask, np.ones((BLOCK,BLOCK), np.uint8))[:H,:W]

alpha = Image.fromarray(mask).filter(ImageFilter.GaussianBlur(0.6))
# keep a solid core so the face never speckles
core = np.zeros((H,W), np.uint8)
core[int(H*0.055):int(H*0.88), int(W*0.11):int(W*0.42)] = 255
alpha = Image.fromarray(np.maximum(np.asarray(alpha), core))

out = im.convert('RGBA'); out.putalpha(alpha)
out.save(f'{OUT}/chrisben-hero.webp', quality=90, method=6)

# ── The low-resolution layer used for the "resolving from pixels" entrance.
lofi = out.resize((26, round(H*26/W)), Image.BILINEAR)
lofi.save(f'{OUT}/chrisben-hero-lofi.webp', quality=80, method=6)

print('hero', out.size, round(os.path.getsize(f'{OUT}/chrisben-hero.webp')/1024),'kB',
      '| lofi', lofi.size, os.path.getsize(f'{OUT}/chrisben-hero-lofi.webp'),'B')

for bg,tag in [((18,17,15),'dark'),((247,242,226),'light')]:
    p=Image.new('RGB', out.size, bg); p.paste(out,(0,0),out)
    p.resize((430, round(H*430/W))).save(f'.tmpwork/hero-{tag}.png')
