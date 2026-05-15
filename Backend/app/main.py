from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base

from app.models import user, dataset

from app.routers import (
    auth,
    dataset as dataset_router,
    forecast
)

from app.routers import report

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(dataset_router.router)
app.include_router(forecast.router)
app.include_router(report.router)

@app.get("/")
def home():

    return {
        "message": "AI Demand Forecasting API Running"
    }