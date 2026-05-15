from fastapi import APIRouter

from fastapi.responses import FileResponse

from reportlab.platypus import (

    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle

)

from reportlab.lib import colors

from reportlab.lib.styles import (
    getSampleStyleSheet
)

import os
import pandas as pd

from app.services.forecast_service import (
    generate_forecast
)

router = APIRouter(
    prefix="/report",
    tags=["Reports"]
)


@router.get("/pdf")
def generate_pdf_report():

    data = generate_forecast()

    pdf_path = "forecast_report.pdf"

    doc = SimpleDocTemplate(
        pdf_path
    )

    styles = getSampleStyleSheet()

    elements = []

    # ---------------------------------
    # Title
    # ---------------------------------

    title = Paragraph(

        "AI Demand Forecast Report",

        styles["Title"]

    )

    elements.append(title)

    elements.append(Spacer(1, 20))

    # ---------------------------------
    # Revenue Forecast Table
    # ---------------------------------

    elements.append(

        Paragraph(
            "Revenue Forecast",
            styles["Heading2"]
        )

    )

    revenue_data = [

        [
            "Future Day",
            "Predicted Revenue"
        ]

    ]

    for item in data["revenue_predictions"]:

        revenue_data.append([

            item["future_day"],

            str(
                item["predicted_revenue"]
            )

        ])

    revenue_table = Table(
        revenue_data
    )

    revenue_table.setStyle(

        TableStyle([

            (
                "BACKGROUND",
                (0, 0),
                (-1, 0),
                colors.lightblue
            ),

            (
                "TEXTCOLOR",
                (0, 0),
                (-1, 0),
                colors.white
            ),

            (
                "GRID",
                (0, 0),
                (-1, -1),
                1,
                colors.black
            ),

        ])

    )

    elements.append(revenue_table)

    elements.append(Spacer(1, 30))

    # ---------------------------------
    # Top Products Table
    # ---------------------------------

    elements.append(

        Paragraph(
            "Top Selling Products",
            styles["Heading2"]
        )

    )

    product_data = [

        [
            "Product",
            "Total Sales"
        ]

    ]

    for item in data["top_products"]:

        product_data.append([

            item["product"],

            str(item["total_sales"])

        ])

    product_table = Table(
        product_data
    )

    product_table.setStyle(

        TableStyle([

            (
                "BACKGROUND",
                (0, 0),
                (-1, 0),
                colors.green
            ),

            (
                "TEXTCOLOR",
                (0, 0),
                (-1, 0),
                colors.white
            ),

            (
                "GRID",
                (0, 0),
                (-1, -1),
                1,
                colors.black
            ),

        ])

    )

    elements.append(product_table)

    # ---------------------------------
    # Build PDF
    # ---------------------------------

    doc.build(elements)

    return FileResponse(

        path=pdf_path,

        filename="forecast_report.pdf",

        media_type="application/pdf"

    )
@router.get("/excel")
def generate_excel_report():

    data = generate_forecast()

    excel_path = "forecast_report.xlsx"

    # ---------------------------------
    # Revenue Forecast Sheet
    # ---------------------------------

    revenue_df = pd.DataFrame(
        data["revenue_predictions"]
    )

    # ---------------------------------
    # Sales Forecast Sheet
    # ---------------------------------

    sales_df = pd.DataFrame(
        data["forecast_predictions"]
    )

    # ---------------------------------
    # Top Products Sheet
    # ---------------------------------

    products_df = pd.DataFrame(
        data["top_products"]
    )

    # ---------------------------------
    # Create Excel File
    # ---------------------------------

    with pd.ExcelWriter(
        excel_path,
        engine="openpyxl"
    ) as writer:

        revenue_df.to_excel(

            writer,

            sheet_name="Revenue Forecast",

            index=False

        )

        sales_df.to_excel(

            writer,

            sheet_name="Sales Forecast",

            index=False

        )

        products_df.to_excel(

            writer,

            sheet_name="Top Products",

            index=False

        )

    return FileResponse(

        path=excel_path,

        filename="forecast_report.xlsx",

        media_type=
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

    )