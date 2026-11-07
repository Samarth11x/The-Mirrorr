import os
import re

print("Running Website Verification Tests...")

errors = []
warnings = []

# 1. Check required files
required_files = [
    "index.html",
    "services.html",
    "css/styles.css",
    "js/app.js",
    "data/reference_data.json"
]
for rf in required_files:
    if not os.path.exists(rf):
        errors.append(f"Missing file: {rf}")
    else:
        print(f"[PASS] Found {rf} ({os.path.getsize(rf)} bytes)")

# 2. Check images referenced in app.js and HTML
with open("js/app.js", "r", encoding="utf-8") as f:
    js_content = f.read()

img_refs = re.findall(r'assets/images/[a-zA-Z0-9_\-\.]+', js_content)
with open("index.html", "r", encoding="utf-8") as f:
    html_content = f.read()
img_refs += re.findall(r'assets/images/[a-zA-Z0-9_\-\.]+', html_content)

for img in set(img_refs):
    if not os.path.exists(img):
        errors.append(f"Referenced image missing: {img}")
    else:
        print(f"[PASS] Asset exists: {img} ({os.path.getsize(img)} bytes)")

# 3. Check critical HTML IDs needed by app.js
critical_ids = [
    "mobileToggle", "drawerClose", "mobileDrawer", "drawerBackdrop",
    "servicesGrid", "serviceSearchInput",
    "serviceModal", "modalClose", "modalImg", "modalCategory", "modalTitle", "modalBody", "modalTags", "modalBookBtn",
    "galleryGrid",
    "lightboxModal", "lightboxClose", "lightboxPrev", "lightboxNext", "lightboxImg", "lightboxCaption",
    "enquiryForm", "formName", "formContact", "formService", "formTimeSlot", "formMessage",
    "successModal", "successSummary", "successCloseBtn"
]

for cid in critical_ids:
    if f'id="{cid}"' not in html_content:
        errors.append(f"index.html missing element with id: {cid}")
    else:
        print(f"[PASS] Element ID found: #{cid}")

# 4. Check contact details
if "+91 80883 23885" not in html_content:
    errors.append("Phone +91 80883 23885 missing in index.html")
if "themirrorr2024@gmail.com" not in html_content:
    errors.append("Email themirrorr2024@gmail.com missing in index.html")
if "B. No. 64, 1st Floor, Vinayaka Nagara" not in html_content:
    errors.append("Address missing in index.html")
if "tel:+918088323885" not in html_content:
    errors.append("tel: link missing in index.html")
if "mailto:themirrorr2024@gmail.com" not in html_content:
    errors.append("mailto: link missing in index.html")

print("\n--- TEST RESULTS ---")
if errors:
    print(f"FAILED with {len(errors)} error(s):")
    for e in errors:
        print("  -", e)
else:
    print("ALL TESTS PASSED! Website files and assets are fully verified.")
