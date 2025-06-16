FROM python:3.13.2-alpine
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt --no-cache-dir
CMD uvicorn main:app --host 0.0.0.0 --port 8000 --reload
