import os
import struct

def get_image_info(filepath):
    with open(filepath, 'rb') as f:
        data = f.read(30)
        size = os.path.getsize(filepath)
        return f"{filepath} ({size} bytes)"

for f in sorted(os.listdir("assets/images")):
    print(get_image_info(os.path.join("assets/images", f)))
