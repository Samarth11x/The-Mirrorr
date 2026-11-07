import re

def inspect_service(fname):
    print("=" * 60)
    print(fname)
    print("=" * 60)
    with open(fname, "r", encoding="utf-8") as f:
        html = f.read()
    
    # Strip script/style
    clean = re.sub(r'<(script|style)[^>]*>.*?</\1>', '', html, flags=re.DOTALL | re.IGNORECASE)
    
    # Look for specific containers or text
    lines = [l.strip() for l in re.findall(r'>([^<]+)<', clean) if l.strip()]
    
    # Print lines that look like descriptions, prices, or content
    for idx, line in enumerate(lines):
        if any(w in line.lower() for w in ['massage', 'polish', 'cut', 'color', 'hair', 'swedish', 'stone', 'facial', 'bridal', 'price', '₹', 'rs', 'offer', 'discount', 'hour', 'service']):
            print(f"[{idx}] {line}")

inspect_service("services_page_1.html")
print("\n" + "#" * 60 + "\n")
inspect_service("service__services_body_polishing_4.html")
print("\n" + "#" * 60 + "\n")
inspect_service("service__services_massage_3.html")
print("\n" + "#" * 60 + "\n")
inspect_service("service__services_women_hair_color_2.html")
print("\n" + "#" * 60 + "\n")
inspect_service("service__services_women_hair_cut_1.html")
