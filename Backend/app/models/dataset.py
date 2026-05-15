from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.database import Base

class Dataset(Base):

    __tablename__ = "datasets"

    id = Column(Integer, primary_key=True, index=True)

    filename = Column(String(255))

    upload_time = Column(
        DateTime,
        default=datetime.utcnow
    )

    total_records = Column(Integer)