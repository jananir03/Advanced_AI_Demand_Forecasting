from pydantic import BaseModel
from datetime import datetime

class DatasetResponse(BaseModel):

    id: int
    filename: str
    upload_time: datetime
    total_records: int

    class Config:
        from_attributes = True