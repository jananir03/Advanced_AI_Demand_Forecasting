from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import HTTPException

import pandas as pd

import shutil
import os

router = APIRouter(
    prefix="/dataset",
    tags=["Dataset"]
)


@router.post("/upload")
async def upload_dataset(

    file: UploadFile = File(...)

):

    # ---------------------------------
    # Upload folder
    # ---------------------------------

    upload_folder = "uploads"

    os.makedirs(
        upload_folder,
        exist_ok=True
    )

    # ---------------------------------
    # Delete old datasets
    # ---------------------------------

    for old_file in os.listdir(upload_folder):

        old_file_path = os.path.join(
            upload_folder,
            old_file
        )

        if os.path.isfile(old_file_path):

            os.remove(old_file_path)

    # ---------------------------------
    # Save new dataset
    # ---------------------------------

    file_path = os.path.join(
        upload_folder,
        file.filename
    )

    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    # ---------------------------------
    # Read dataset
    # ---------------------------------

    try:

        if file.filename.endswith(".csv"):

            df = pd.read_csv(file_path)

        elif file.filename.endswith(".xlsx"):

            df = pd.read_excel(file_path)

        else:

            raise HTTPException(

                status_code=400,

                detail=
                    "Only CSV and Excel files are supported"

            )

    except Exception as e:

        raise HTTPException(

            status_code=400,

            detail=f"Dataset read failed: {str(e)}"

        )

    # ---------------------------------
    # Normalize columns
    # ---------------------------------

    df.columns = (

        df.columns
        .str.lower()
        .str.strip()

    )

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

            raise HTTPException(

                status_code=400,

                detail=
                    f"Missing required column: {col}"

            )

    # ---------------------------------
    # Clean dataset
    # ---------------------------------

    original_rows = len(df)

    df = df.dropna()

    cleaned_rows = len(df)

    # ---------------------------------
    # Save cleaned dataset
    # ---------------------------------

    if file.filename.endswith(".csv"):

        df.to_csv(
            file_path,
            index=False
        )

    elif file.filename.endswith(".xlsx"):

        df.to_excel(
            file_path,
            index=False
        )

    # ---------------------------------
    # Success response
    # ---------------------------------

    return {

        "message":
            "Dataset uploaded successfully",

        "file_name":
            file.filename,

        "original_rows":
            original_rows,

        "cleaned_rows":
            cleaned_rows

    }