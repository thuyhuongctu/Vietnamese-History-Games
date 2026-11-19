import sys
from PIL import Image, ImageFilter, ImageEnhance, ImageDraw
src, out, f0, f1 = sys.argv[1], sys.argv[2], float(sys.argv[3]), float(sys.argv[4])
im = Image.open(src).convert('RGB'); W, H = im.size
blur = im.filter(ImageFilter.GaussianBlur(7))
mask = Image.new('L', (1, H))            # nét ở dải giữa [f0,f1], mờ dần lên trên và xuống dưới (hiệu ứng mô hình thu nhỏ)
for y in range(H):
    t = y / H
    d = (f0 - t) / f0 if t < f0 else ((t - f1) / (1 - f1) if t > f1 else 0)
    mask.putpixel((0, y), int(255 * min(1, d * 1.25) ** 1.3))
im = Image.composite(blur, im, mask.resize((W, H)))
im = ImageEnhance.Color(im).enhance(1.08); im = ImageEnhance.Contrast(im).enhance(1.05)
vig = Image.new('L', (W, H), 0); d = ImageDraw.Draw(vig)    # tối nhẹ bốn góc
d.ellipse((-W*0.25, -H*0.35, W*1.25, H*1.35), fill=255); vig = vig.filter(ImageFilter.GaussianBlur(160))
dark = ImageEnhance.Brightness(im).enhance(0.8); im = Image.composite(im, dark, vig)
im.resize((1200, 750), Image.LANCZOS).save(out, 'WEBP', quality=84, method=6)
