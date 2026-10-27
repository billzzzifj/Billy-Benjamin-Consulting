import os
import base64
from google import genai

client = genai.Client()

prompt = (
    "Editorial high-fashion campaign photograph of an African luxury ready-to-wear silk-linen trench dress "
    "displayed on a minimalist vein-cut travertine stone plinth against an architectural raw bone plaster wall. "
    "Directional chiaroscuro natural window light casting deep geometric shadows. Minimalist Swiss architectural composition, "
    "tactile woven fabric grain, medium-format photographic grain, neutral warm bone and obsidian tones with subtle olive accents. "
    "High-end luxury fashion editorial spread, physical materiality, analog medium-format camera quality, no plastic sheen, no artificial glow."
)

print("[INFO] Querying gemini-nano-banana-2.1 for editorial visual synthesis...")
try:
    interaction = client.interactions.create(
        model="gemini-nano-banana-2.1",
        input=prompt,
    )
    
    if interaction.output_image and interaction.output_image.data:
        os.makedirs("exports/mockups-ziva-lagos", exist_ok=True)
        out_path = "exports/mockups-ziva-lagos/ziva-editorial-dress.png"
        img_bytes = base64.b64decode(interaction.output_image.data)
        with open(out_path, "wb") as f:
            f.write(img_bytes)
        print(f"[SUCCESS] Synthesized image saved to: {out_path} ({len(img_bytes) / 1024:.1f} KB)")
    else:
        print("[WARNING] No output_image returned in interaction:", interaction)
except Exception as e:
    print(f"[ERROR] Generation failed: {e}")
