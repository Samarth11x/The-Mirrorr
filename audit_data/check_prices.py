import os
import re

for fname in os.listdir("."):
    if fname.endswith(".html"):
        with open(fname, "r", encoding="utf-8") as f:
            content = f.read()
            # Find ₹ or Rs or price
            matches = re.findall(r'(\b(?:price|cost|inr|rs\.?|₹)\s*[:\-\s]?\s*\d+[\d,]*)', content, re.IGNORECASE)
            # filter out boilerplate like jquery version or svg viewBox
            valid = [m for m in matches if not any(x in m.lower() for x in ['viewbox', 'version', 'xmlns', 'jquery'])]
            if valid:
                print(f"{fname}: {valid}")
