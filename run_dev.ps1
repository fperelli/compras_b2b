# B2B Procurement Negotiation SaaS - Orchestration Script
# Start both Backend and Frontend from the root directory.

$ROOT_DIR = Get-Location
Write-Host ">>> Starting B2B Procurement Platform..." -ForegroundColor Cyan

# 1. Start Backend (FastAPI)
Write-Host ">>> Starting Backend on port 8000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "`$env:PYTHONPATH='${ROOT_DIR}'; cd agent; .\.venv\Scripts\Activate.ps1; python -m src.api.main"

# 2. Start Frontend (Next.js)
Write-Host ">>> Starting Frontend on port 3000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host ">>> Done! Servers launching in separate windows." -ForegroundColor Green
Write-Host ">>> Frontend: http://localhost:3000"
Write-Host ">>> Backend Docs: http://localhost:8000/docs"
