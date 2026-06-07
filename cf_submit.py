import requests
import sys
import os
import re
import json

def login_and_submit(problem_id, filepath):
    handle = "hasibcore"
    password = "obak@valobasha"
    
    session = requests.Session()
    session.headers.update({
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    })
    
    # Get login page
    r = session.get("https://codeforces.com/enter")
    if r.status_code != 200:
        print(f"Failed to access Codeforces (status {r.status_code}). Try manual login.")
        return False
    
    # Find CSRF token
    match = re.search(r"csrf='(.+?)'", r.text)
    if not match:
        print("Could not find CSRF token. Cloudflare may be blocking.")
        # Try alternate csrf pattern
        match = re.search(r'name="csrf_token" value="([^"]+)"', r.text)
    if not match:
        print("Cannot login automatically due to Cloudflare protection.")
        print("But cf tool or browser-based submission may work.")
        return False
    
    csrf = match.group(1)
    
    # Login
    r = session.post("https://codeforces.com/enter", data={
        "csrf_token": csrf,
        "action": "enter",
        "handleOrEmail": handle,
        "password": password,
        "remember": "on",
    })
    
    if "handle = " not in r.text:
        print("Login failed.")
        return False
    
    # Parse contest and problem
    contest_id = ""
    problem_letter = ""
    m = re.match(r"(\d+)([A-Za-z])", problem_id)
    if m:
        contest_id = m.group(1)
        problem_letter = m.group(2).upper()
    
    # Get submit page
    submit_url = f"https://codeforces.com/contest/{contest_id}/submit"
    r = session.get(submit_url)
    match = re.search(r"csrf='(.+?)'", r.text)
    if not match:
        match = re.search(r'name="csrf_token" value="([^"]+)"', r.text)
    if not match:
        print("Could not find CSRF on submit page.")
        return False
    
    csrf = match.group(1)
    
    # Read source code
    with open(filepath, "r", encoding="utf-8") as f:
        source = f.read()
    
    # Submit
    r = session.post(submit_url, data={
        "csrf_token": csrf,
        "action": "submitSolutionFormSubmitted",
        "submittedProblemIndex": problem_letter,
        "programTypeId": "54",
        "contestId": contest_id,
        "source": source,
        "tabSize": "4",
        "sourceCodeConfirmed": "true",
    })
    
    if "submitted successfully" in r.text.lower():
        print(f"Submitted {problem_id} successfully!")
        return True
    else:
        print("Submission may have failed. Check Codeforces.")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python cf_submit.py <problem_id> <file>")
        sys.exit(1)
    ok = login_and_submit(sys.argv[1], sys.argv[2])
    sys.exit(0 if ok else 1)
