import os
import re

for root, dirs, files in os.walk("client/src"):
    for f in files:
        if f.endswith(".tsx") or f.endswith(".ts"):
            p = os.path.join(root, f)
            with open(p, "r", encoding="utf-8") as file:
                lines = file.readlines()
                for i, line in enumerate(lines):
                    if 'style="' in line:
                        print(f"{p}:{i+1}: {line.strip()}")
