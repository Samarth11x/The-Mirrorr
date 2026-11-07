import os
import urllib.request
import urllib.parse

os.makedirs("assets/images", exist_ok=True)

images_to_download = {
    "logo.jpg": "https://fplogoimages.withfloats.com/actual/674c2a177110729fc951cfef.jpg",
    "favicon.jpeg": "https://fpfaviconimages.withfloats.com/tile/660b8f3ea518eedaf8231843.jpeg",
    "service_haircut.jpg": "https://productimages.withfloats.com/serviceimages/tile/660b99a65a08a11d4626643awoman-getting-her-hair-cut-beauty-salon-scaled",
    "service_haircolor.jpg": "https://productimages.withfloats.com/serviceimages/tile/660b9d469f6e942b760d62d2HD-wallpaper-hair-colorful-skin-texture",
    "service_bodypolishing.jpg": "https://productimages.withfloats.com/serviceimages/tile/66177640c81c35d61fdfd13ddiy-body-polishingthemirrorr",
    "service_massage.jpg": "https://productimages.withfloats.com/serviceimages/tile/66176d8d9e6097d4ec18726fthemirrorr01",
    "gallery_1.jpg": "https://fpimages.withfloats.com/actual/660b9376c27c8bfa4465e790.jpg",
    "gallery_2.jpg": "https://fpimages.withfloats.com/actual/660b9383887b35bf51b153a8.jpg",
    "gallery_3.jpg": "https://fpimages.withfloats.com/actual/660b938217445f91396ca91e.jpg",
    "gallery_4.jpg": "https://fpimages.withfloats.com/actual/660b9382231ec71601affd94.jpg",
    "gallery_5.jpg": "https://fpimages.withfloats.com/actual/660b93750d2b465f92892af9.jpg",
    "gallery_6.jpg": "https://fpimages.withfloats.com/actual/660b93829f37f5af97e0a14d.jpg",
    "gallery_7.jpg": "https://fpimages.withfloats.com/actual/660b93759f37f5af97e0a137.jpg",
    "gallery_8.jpg": "https://fpimages.withfloats.com/actual/660b93837158b0d796cf841a.jpg"
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/115.0.0.0 Safari/537.36'
}

for filename, url in images_to_download.items():
    filepath = os.path.join("assets/images", filename)
    print(f"Downloading {filename}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            with open(filepath, "wb") as f:
                f.write(resp.read())
        print(f"Saved: {filepath}")
    except Exception as e:
        print(f"Error {filename}: {e}")

print("Assets download completed!")
