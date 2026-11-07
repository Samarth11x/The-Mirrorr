import re

with open("home.html", "r", encoding="utf-8") as f:
    html = f.read()

clean = re.sub(r'<(script|style)[^>]*>.*?</\1>', '', html, flags=re.DOTALL | re.IGNORECASE)
lines = [l.strip() for l in re.findall(r'>([^<]+)<', clean) if l.strip()]

print("Searching for bridal, sale, offer, discount, price, gallery...")
for i, l in enumerate(lines):
    if any(k in l.lower() for k in ['bridal', 'sale', 'offer', '₹', 'rs.', '20', 'discount', 'deal', 'testimonial', 'review', 'about', 'team', 'expert']):
        print(f"[{i}] {l}")

print("\n--- ALL UNIQUE IMAGES ON HOMEPAGE ---")
imgs = re.findall(r'src=["\']([^"\']+)["\']', html)
fp_imgs = [img for img in imgs if 'withfloats' in img or 'boost' in img]
for img in set(fp_imgs):
    print(img)
