import urllib.request
import xml.etree.ElementTree as ET
import re
import json
import os

url = "https://curationofcurations.substack.com/feed"
headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}

print("[INFO] Fetching Curation of Curations RSS feed...")
req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req) as resp:
    xml_data = resp.read()

print(f"[INFO] Feed retrieved ({len(xml_data) / 1024:.1f} KB). Parsing XML tree...")
root = ET.fromstring(xml_data)

channel = root.find("channel")
items = channel.findall("item")
print(f"[INFO] Found {len(items)} published curation issues.")

curation_archive = []
all_extracted_links = []
design_tools = []
typography_nodes = []
articles_and_reads = []

url_regex = re.compile(r'href=[\'"](https?://[^\'">]+)[\'"]')

for idx, item in enumerate(items):
    title = item.find("title").text if item.find("title") is not None else f"Issue #{idx+1}"
    pub_date = item.find("pubDate").text if item.find("pubDate") is not None else ""
    link = item.find("link").text if item.find("link") is not None else ""
    desc = item.find("description").text if item.find("description") is not None else ""
    
    # Strip HTML tags for clean text preview
    clean_text = re.sub(r'<[^>]+>', ' ', desc)
    clean_text = re.sub(r'\s+', ' ', clean_text).strip()
    
    # Extract outbound curated links
    links = url_regex.findall(desc)
    filtered_links = [l for l in links if "substack.com" not in l and "twitter.com" not in l and "apple.com" not in l]
    
    entry = {
        "issue_number": idx + 1,
        "title": title,
        "date": pub_date,
        "substack_link": link,
        "text_summary": clean_text[:400] + ("..." if len(clean_text) > 400 else ""),
        "curated_links_count": len(filtered_links),
        "curated_links": filtered_links[:8]
    }
    curation_archive.append(entry)

out_dir = "recon_data"
os.makedirs(out_dir, exist_ok=True)
out_file = os.path.join(out_dir, "curation_of_curations_archive.json")

with open(out_file, "w", encoding="utf-8") as f:
    json.dump({
        "publication": "Curation of Curations",
        "author": "Sulaimaan Durrani",
        "feed_url": url,
        "total_issues_analyzed": len(items),
        "archive": curation_archive
    }, f, indent=2)

print(f"[SUCCESS] Parsed and saved {len(curation_archive)} curation editions to: {out_file}")
