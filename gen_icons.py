from PIL import Image, ImageDraw, ImageFont
import os

path = r"C:\Users\Henry-AI\Desktop\financial-planner\icons"

for size, label_size in [(192, 80), (512, 200)]:
    img = Image.new('RGBA', (size, size), (22, 22, 22, 255))
    draw = ImageDraw.Draw(img)
    
    cx, cy = size//2, size//2
    r = size * 0.38
    pts = [(cx, cy-r), (cx+r, cy), (cx, cy+r), (cx-r, cy)]
    draw.polygon(pts, outline=(200, 200, 200, 255), width=max(2, size//64))
    
    r2 = size * 0.28
    pts2 = [(cx, cy-r2), (cx+r2, cy), (cx, cy+r2), (cx-r2, cy)]
    draw.polygon(pts2, fill=(200, 200, 200, 255))
    
    try:
        fnt = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", label_size)
    except:
        try:
            fnt = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", label_size)
        except:
            fnt = ImageFont.load_default()
    
    text = "FP"
    bbox = draw.textbbox((0,0), text, font=fnt)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    tx = cx - tw//2
    ty = cy - th//2
    draw.text((tx, ty), text, fill=(22, 22, 22, 255), font=fnt)
    
    img.save(os.path.join(path, f"icon-{size}.png"))

fav = Image.new('RGBA', (48, 48), (22, 22, 22, 255))
draw = ImageDraw.Draw(fav)
cx, cy, s = 24, 24, 48
r = s * 0.38
pts = [(cx, cy-r), (cx+r, cy), (cx, cy+r), (cx-r, cy)]
draw.polygon(pts, outline=(200,200,200,255), width=1)
r2 = s * 0.28
pts2 = [(cx, cy-r2), (cx+r2, cy), (cx, cy+r2), (cx-r2, cy)]
draw.polygon(pts2, fill=(200,200,200,255))
try:
    fnt = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 18)
except:
    fnt = ImageFont.load_default()
text = "FP"
bbox = draw.textbbox((0,0), text, font=fnt)
tw = bbox[2]-bbox[0]
th = bbox[3]-bbox[1]
draw.text((cx-tw//2, cy-th//2), text, fill=(22,22,22,255), font=fnt)
fav.save(os.path.join(path, "favicon.png"))

print("Icons generated successfully:")
for f in os.listdir(path):
    fp = os.path.join(path, f)
    print(f"  {f}: {os.path.getsize(fp)} bytes")
print("Done!")
