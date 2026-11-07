import os
import re
import json
from html.parser import HTMLParser

class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.result = []
        self.current_tag = None
        self.links = []
        self.images = []

    def handle_starttag(self, tag, attrs):
        self.current_tag = tag
        attr_dict = dict(attrs)
        if tag == 'a' and 'href' in attr_dict:
            self.links.append((attr_dict['href'], ''))
        if tag == 'img':
            src = attr_dict.get('src') or attr_dict.get('data-src') or ''
            alt = attr_dict.get('alt') or ''
            if src:
                self.images.append({'src': src, 'alt': alt})

    def handle_data(self, data):
        cleaned = data.strip()
        if cleaned:
            self.result.append(cleaned)

def extract_from_html(html_content):
    # Extract Title
    title_m = re.search(r'<title[^>]*>(.*?)</title>', html_content, re.IGNORECASE | re.DOTALL)
    title = title_m.group(1).strip() if title_m else ""
    
    # Extract meta description
    desc_m = re.search(r'<meta[^>]*name=["\']description["\'][^>]*content=["\'](.*?)["\']', html_content, re.IGNORECASE)
    meta_desc = desc_m.group(1).strip() if desc_m else ""

    # Extract all text chunks
    # Remove script and style tags
    clean_html = re.sub(r'<(script|style)[^>]*>.*?</\1>', '', html_content, flags=re.IGNORECASE | re.DOTALL)
    
    # Find all image tags
    img_matches = re.findall(r'<img[^>]+>', clean_html, re.IGNORECASE)
    images = []
    for img in img_matches:
        src_m = re.search(r'src=["\']([^"\']+)["\']', img)
        alt_m = re.search(r'alt=["\']([^"\']*)["\']', img)
        src = src_m.group(1) if src_m else ""
        alt = alt_m.group(1) if alt_m else ""
        if src and not src.startswith("data:"):
            images.append({'src': src, 'alt': alt})

    # Find text
    text_chunks = re.findall(r'>([^<]+)<', clean_html)
    cleaned_chunks = [c.strip() for c in text_chunks if c.strip()]
    
    return {
        "title": title,
        "meta_desc": meta_desc,
        "images": images,
        "text_sample": cleaned_chunks[:100],
        "all_text": " \n ".join(cleaned_chunks)
    }

# Analyze home.html
with open("home.html", "r", encoding="utf-8") as f:
    home_data = extract_from_html(f.read())

print("=== HOME PAGE TITLE ===")
print(home_data["title"])
print("=== META DESCRIPTION ===")
print(home_data["meta_desc"])

# Let's inspect service pages
service_files = [
    ("women-hair-cut", "service__services_women_hair_cut_1.html"),
    ("women-hair-color", "service__services_women_hair_color_2.html"),
    ("massage", "service__services_massage_3.html"),
    ("body-polishing", "service__services_body_polishing_4.html")
]

services_extracted = {}
for key, fname in service_files:
    if os.path.exists(fname):
        with open(fname, "r", encoding="utf-8") as f:
            res = extract_from_html(f.read())
            services_extracted[key] = res
            print(f"\n==================== {key.upper()} ====================")
            print(f"Title: {res['title']}")
            print(f"Meta Desc: {res['meta_desc']}")
            print("Images:")
            for img in res['images']:
                if 'withfloats' in img['src']:
                    print(f"  - {img['src']} (alt: {img['alt']})")

with open("detailed_extracted.json", "w", encoding="utf-8") as f:
    json.dump({
        "home": home_data,
        "services": services_extracted
    }, f, indent=2)

print("\nSaved detailed_extracted.json successfully!")
