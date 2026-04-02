FROM python:3.13-slim

WORKDIR /app

# Install system dependencies needed for compiling C extensions (like hnswlib/chromadb)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# Upgrade pip and install requirements
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy application source code
COPY ./src ./src

# Create default directories if they don't exist
RUN mkdir -p chroma_db spec

# Set the python path so modules resolve properly
ENV PYTHONPATH=/app

# Expose FastAPI port
EXPOSE 8000

# Run Uvicorn in production mode
CMD ["uvicorn", "src.api.main:app", "--host", "0.0.0.0", "--port", "8000"]
