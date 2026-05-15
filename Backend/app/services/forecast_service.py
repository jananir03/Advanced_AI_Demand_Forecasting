import pandas as pd
import numpy as np
import os

from sklearn.linear_model import LinearRegression


def generate_forecast():

    # ---------------------------------
    # Upload folder
    # ---------------------------------

    upload_folder = "uploads"

    # ---------------------------------
    # Get latest uploaded dataset
    # ---------------------------------

    files = [

        os.path.join(upload_folder, file)

        for file in os.listdir(upload_folder)

    ]

    if not files:

        raise Exception(
            "No dataset uploaded"
        )

    latest_file = max(
        files,
        key=os.path.getctime
    )

    file_path = latest_file

    latest_file_name = os.path.basename(
        latest_file
    )

    print("Reading file:", latest_file_name)

    # ---------------------------------
    # Read dataset
    # ---------------------------------

    if latest_file_name.endswith(".csv"):

        df = pd.read_csv(file_path)

    elif latest_file_name.endswith(".xlsx"):

        df = pd.read_excel(file_path)

    else:

        raise Exception(
            "Unsupported dataset format"
        )

    # ---------------------------------
    # Normalize columns
    # ---------------------------------

    df.columns = (

        df.columns
        .str.lower()
        .str.strip()

    )

    print("Columns:", df.columns)

    # ---------------------------------
    # Required columns
    # ---------------------------------

    required_columns = [

        "date",
        "product",
        "sales"

    ]

    for col in required_columns:

        if col not in df.columns:

            raise Exception(
                f"Missing required column: {col}"
            )

    # ---------------------------------
    # Convert date
    # ---------------------------------

    df["date"] = pd.to_datetime(
        df["date"],
        errors="coerce"
    )

    # ---------------------------------
    # Convert sales
    # ---------------------------------

    df["sales"] = pd.to_numeric(

        df["sales"],

        errors="coerce"

    )

    # ---------------------------------
    # Clean only required fields
    # ---------------------------------

    df = df.dropna(

        subset=[
            "date",
            "product",
            "sales"
        ]

    )

    print(
        "Rows after cleaning:",
        len(df)
    )

    print(
        "Products:",
        df["product"].unique()
    )

    # ---------------------------------
    # Top Product Analytics
    # ---------------------------------

    product_sales = (

        df.groupby("product")["sales"]
        .sum()
        .sort_values(ascending=False)

    )

    top_products = []

    for product, sales in product_sales.items():

        top_products.append({

            "product": product,

            "total_sales": round(
                float(sales),
                2
            )

        })

    # ---------------------------------
    # Forecast Preparation
    # ---------------------------------

    daily_sales = (

        df.groupby("date")["sales"]
        .sum()
        .reset_index()

    )

    daily_sales = daily_sales.sort_values(
        "date"
    )

    daily_sales["day_number"] = np.arange(
        len(daily_sales)
    )

    # ---------------------------------
    # Train Model
    # ---------------------------------

    X = daily_sales[["day_number"]]

    y = daily_sales["sales"]

    model = LinearRegression()

    model.fit(X, y)

    # ---------------------------------
    # Predict Future Sales
    # ---------------------------------

    future_days = np.array([

    [len(daily_sales) + i]

    for i in range(10)

    ])

    predictions = model.predict(
        future_days
    )

    forecast_predictions = []

    for i, value in enumerate(predictions):

        forecast_predictions.append({

            "future_day": f"Day {i + 1}",

            "predicted_sales": round(
                float(value),
                2
            )

        })
        # ---------------------------------
    # Revenue Forecast
    # ---------------------------------

    revenue_predictions = []



    revenue_multiplier = 120

    for i, value in enumerate(predictions):

        predicted_revenue = (
            float(value)
            * revenue_multiplier
        )

        revenue_predictions.append({

            "future_day":
                f"Day {i + 1}",

            "predicted_revenue":

                round(
                    predicted_revenue,
                    2
                )

        })

    # ---------------------------------
    # Final Response
    # ---------------------------------

    return {

    "top_products":
        top_products,

    "forecast_predictions":
        forecast_predictions,

    "revenue_predictions":
        revenue_predictions

}