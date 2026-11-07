with open("services.html", "r", encoding="utf-8") as f:
    content = f.read()

checks = ["servicesGrid", "serviceModal", "serviceSearchInput", "mobileToggle"]
for c in checks:
    print(f"services.html has #{c}:", f'id="{c}"' in content)
