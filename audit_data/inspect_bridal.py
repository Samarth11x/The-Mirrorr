import re

with open("home.html", "r", encoding="utf-8") as f:
    html = f.read()

clean = re.sub(r'<(script|style)[^>]*>.*?</\1>', '', html, flags=re.DOTALL | re.IGNORECASE)
lines = [l.strip() for l in re.findall(r'>([^<]+)<', clean) if l.strip()]

for i in range(max(0, 125), min(len(lines), 145)):
    print(f"[{i}] {lines[i]}")
