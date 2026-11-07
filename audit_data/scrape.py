import urllib.request
import urllib.parse
import re
import json
import os
from html.parser import HTMLParser

BASE_URL = "https://themirrorrunisexhairbeautysalon.nowfloats.com"

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
}

def fetch_url(url):
    print(f"Fetching: {url}")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as response:
            return response.read().decode('utf-8', errors='replace')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

results = {
    "pages": {},
    "services": [],
    "gallery": [],
    "offers": [],
    "contact": {},
    "failed_urls": []
}

# 1. Fetch Homepage
home_html = fetch_url(BASE_URL)
if home_html:
    results["pages"]["home"] = home_html
    with open("home.html", "w", encoding="utf-8") as f:
        f.write(home_html)
else:
    results["failed_urls"].append(BASE_URL)

# 2. Fetch All Services pages (pagination 1, 2, 3...)
service_links = set()
page = 1
while True:
    service_page_url = f"{BASE_URL}/all-services/{page}"
    page_html = fetch_url(service_page_url)
    if not page_html:
        results["failed_urls"].append(service_page_url)
        break
    
    with open(f"services_page_{page}.html", "w", encoding="utf-8") as f:
        f.write(page_html)
    
    # Check if there are service items or if page is empty / redirected
    # Look for service links like /service/... or /services/... or item cards
    # NowFloats typical links: href="/services/..." or "/service/..." or similar
    links = re.findall(r'href=["\'](/[^"\']*service[^"\']*)["\']', page_html, re.IGNORECASE)
    # Also find all /product/ or /services/ or any item links
    other_links = re.findall(r'href=["\']([^"\']+)["\']', page_html)
    
    found_on_page = 0
    for l in other_links:
        if ('/service/' in l.lower() or '/services/' in l.lower()) and not '/all-services/' in l.lower():
            full_l = urllib.parse.urljoin(BASE_URL, l)
            if full_l not in service_links:
                service_links.add(full_l)
                found_on_page += 1
                
    print(f"Page {page}: found {found_on_page} new service links.")
    
    # Check pagination: check if there is a next page or if this page has content
    # Look for pagination links or whether the page has items
    has_next = f"/all-services/{page+1}" in page_html or f"/all-Services/{page+1}" in page_html
    if not has_next and found_on_page == 0 and page > 1:
        print(f"No more pages after page {page}.")
        break
    if page >= 10: # safeguard
        break
    page += 1

print(f"Total unique service links found: {len(service_links)}")

# 3. Fetch each service detail page
for s_url in sorted(list(service_links)):
    s_html = fetch_url(s_url)
    if s_html:
        s_filename = re.sub(r'[^a-zA-Z0-9]', '_', s_url.replace(BASE_URL, ''))[:50] + ".html"
        with open(f"service_{s_filename}", "w", encoding="utf-8") as f:
            f.write(s_html)
        results["services"].append({
            "url": s_url,
            "html_file": f"service_{s_filename}"
        })
    else:
        results["failed_urls"].append(s_url)

# Save intermediate summary
with open("scraped_summary.json", "w", encoding="utf-8") as f:
    json.dump({
        "service_links": list(service_links),
        "failed_urls": results["failed_urls"]
    }, f, indent=2)

print("Scraping completed!")
