import requests

url = "http://localhost:3000/api/settings/upload"
file_path = r"C:\Users\ferna\Proyectos\IA\compras_b2b\test_policy.md"

with open(file_path, "rb") as f:
    files = {"file": ("test_policy.md", f, "text/markdown")}
    data = {"tenant_id": "tenant_default"}
    response = requests.post(url, files=files, data=data)

print(response.status_code)
print(response.text)
