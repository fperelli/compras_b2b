from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from .routes import router

app = FastAPI(
    title="B2B Procurement Negotiation Agent API",
    description="Intelligent Architect backend for automated procurement strategies.",
    version="1.0.0"
)

# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "B2B Procurement API is live", "docs": "/docs"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
