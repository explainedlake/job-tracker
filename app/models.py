from sqlalchemy import Column, Integer, String, Text
from .database import Base

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    company = Column(String, nullable=False)
    title = Column(String, nullable=False)
    url = Column(String, nullable=False)
    status = Column(String, default="Not Applied")
    description = Column(Text)
