from fastapi import APIRouter

from app.services.forecast_service import (
    generate_forecast
)

router = APIRouter(
    prefix="/forecast",
    tags=["Forecast"]
)


@router.get("/predict")
def predict_sales():

    try:

        predictions = generate_forecast()

        return predictions

    except Exception as e:

        return {

            "error": str(e)

        }