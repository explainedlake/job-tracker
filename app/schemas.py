from pydantic import BaseModel

class JobCreate(BaseModel):
    company: str
    title: str
    url: str
    status: str
    description: str

class JobOut(JobCreate):
    id: int

    class Config:
        orm_mode = True
