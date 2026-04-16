import urllib.request
import urllib.parse
import json
import uuid

url = "http://localhost:3000/api/settings/upload"
file_path = "C:\\Users\\ferna\\Proyectos\\IA\\compras_b2b\\test_policy.md"

with open(file_path, "rb") as f:
    file_content = f.read()

boundary = uuid.uuid4().hex
payload = (
    f"--{boundary}\r\n"
    f'Content-Disposition: form-data; name="file"; filename="test_policy.md"\r\n'
    f"Content-Type: text/markdown\r\n\r\n".encode("utf-8") + file_content + f"\r\n"
    f"--{boundary}\r\n"
    f'Content-Disposition: form-data; name="tenant_id"\r\n\r\n'
    f"tenant_default\r\n"
    f"--{boundary}--\r\n".encode("utf-8")
)

req = urllib.request.Request(url, data=payload)
req.add_header("Content-Type", f"multipart/form-data; boundary={boundary}")
req.add_header("Content-Length", len(payload))

try:
    response = urllib.request.urlopen(req)
    print("STATUS:", response.status)
    print("BODY:", response.read().decode("utf-8"))
except urllib.error.HTTPError as e:
    print("ERROR STATUS:", e.code)
    print("ERROR BODY:", e.read().decode("utf-8"))
