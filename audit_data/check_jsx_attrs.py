import os
import re

bad_patterns = [
    (r'\bstyle="[^"]*"', 'style string'),
    (r'\bclass="[^"]*"', 'class instead of className'),
    (r'\bstroke-width="', 'stroke-width instead of strokeWidth'),
    (r'\bstroke-linecap="', 'stroke-linecap instead of strokeLinecap'),
    (r'\bstroke-linejoin="', 'stroke-linejoin instead of strokeLinejoin')
]

for root, dirs, files in os.walk("client/src"):
    for f in files:
        if f.endswith(".tsx"):
            p = os.path.join(root, f)
            with open(p, "r", encoding="utf-8") as file:
                content = file.read()
                for pat, desc in bad_patterns:
                    matches = re.findall(pat, content)
                    if matches:
                        print(f"Found {desc} in {p}: {len(matches)} occurrences (e.g. {matches[0]})")
