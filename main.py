from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Cyber Dashboard API Running",
        "status": "success"
    }

@app.get("/threats")
def threats():
    return {
        "critical": 5,
        "high": 12,
        "medium": 25,
        "low": 40
    }

@app.get("/alerts")
def alerts():
    return [
        {
            "id": 1,
            "alert": "Brute Force Login Attempt",
            "severity": "High"
        },
        {
            "id": 2,
            "alert": "Malware Detected",
            "severity": "Critical"
        },
        {
            "id": 3,
            "alert": "Suspicious IP Activity",
            "severity": "Medium"
        }
    ]
