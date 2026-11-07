import re

with open("service__services_massage_3.html", "r", encoding="utf-8") as f:
    html = f.read()

clean = re.sub(r'<(script|style)[^>]*>.*?</\1>', '', html, flags=re.DOTALL | re.IGNORECASE)
lines = [l.strip() for l in re.findall(r'>([^<]+)<', clean) if l.strip()]

for i, l in enumerate(lines):
    if len(l) > 30:
        print(f"[{i}] {l}\n")
