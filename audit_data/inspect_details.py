import re

with open("home.html", "r", encoding="utf-8") as f:
    html = f.read()

# Check mapview coordinates
map_links = re.findall(r'href=["\']([^"\']*mapview[^"\']*)["\']', html)
print("Map links:", map_links)

# Check social links
social_links = re.findall(r'href=["\']([^"\']*(?:facebook|instagram|twitter|youtube|linkedin|wa\.me|whatsapp)[^"\']*)["\']', html)
print("Social links:", social_links)

# Check all nav items
nav_matches = re.findall(r'<nav[^>]*>.*?</nav>', html, flags=re.DOTALL | re.IGNORECASE)
print("Nav blocks count:", len(nav_matches))

# Let's inspect the entire about section text in home.html
about_match = re.search(r'The Mirror Unisex Hair & Beauty Salon is a premier destination in Bangalore.*?(?=<div|<section|<\/p)', html, flags=re.DOTALL)
if about_match:
    print("\nAbout text found:\n", about_match.group(0))

# Check Ask Us Anything form fields
if "Ask Us" in html or "ask" in html.lower():
    form_matches = re.findall(r'<form[^>]*>.*?</form>', html, flags=re.DOTALL | re.IGNORECASE)
    print("\nForm count:", len(form_matches))
    for idx, form in enumerate(form_matches):
        print(f"\nForm {idx+1}:")
        inputs = re.findall(r'<input[^>]+>|<textarea[^>]+>', form)
        for inp in inputs:
            print("  ", inp)
