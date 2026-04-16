import urllib.request
import urllib.parse
import json
import uuid

BASE_URL = "http://localhost:3000/api/settings"
TENANT = "tenant_default"

def list_policies():
    print("Fetching policies...")
    req = urllib.request.Request(f"{BASE_URL}/policies?tenant_id={TENANT}")
    try:
        response = urllib.request.urlopen(req)
        data = json.loads(response.read().decode())
        print("Policies:", [f["name"] for f in data.get("files", [])])
        return data.get("files", [])
    except Exception as e:
        print("Failed to list policies:", e)
        return []

def delete_policy(filename):
    print(f"Deleting {filename}...")
    url = f"{BASE_URL}/policies?tenant_id={TENANT}&filename={urllib.parse.quote(filename)}"
    req = urllib.request.Request(url, method="DELETE")
    try:
        response = urllib.request.urlopen(req)
        print("Delete response:", response.status)
    except Exception as e:
        print("Failed to delete policy:", e)

if __name__ == "__main__":
    # 1. Initial list
    initial = list_policies()
    
    # 2. Assume we upload via the existing test_upload_native.py logic or manually
    # We will just verify that the test runs
    
    # Let's delete our test_policy.md if it's there to test deletion
    target = "test_policy.md"
    if any(p["name"] == target for p in initial):
        delete_policy(target)
        
        # 3. Verify deletion
        final = list_policies()
        assert not any(p["name"] == target for p in final), "File was not deleted!"
        print("✅ E2E Deletion flow passed!")
    else:
        print("No test_policy.md found. Test implies we need to upload first.")
        print("Run `python test_upload_native.py` and then run this script again.")
