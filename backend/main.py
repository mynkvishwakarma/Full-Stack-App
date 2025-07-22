from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS configuration
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/message")
async def get_message():
    return {"message": "Hello from FastAPI backend!", "status": "success"}

@app.post("/api/submit")
async def submit_data(data: dict):
    return {
        "received_data": data,
        "confirmation": "Data processed successfully!"
    }