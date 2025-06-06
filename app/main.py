from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas, database
from fastapi.middleware.cors import CORSMiddleware

from .utils.scraper import scrape_wework_stealth

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

# Added when the frontend (localhost:5173) tries to talk to the backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/jobs", response_model=schemas.JobOut)
def create_job(job: schemas.JobCreate, db: Session = Depends(get_db)):
    db_job = models.Job(**job.dict())
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job


@app.get("/jobs", response_model=list[schemas.JobOut])
def list_jobs(db: Session = Depends(get_db)):
    return db.query(models.Job).all()


@app.post("/scrape")
def scrape_job(url: str, db: Session = Depends(get_db)):
    try:
        result = scrape_wework_stealth(url)
        
        new_job = models.Job(
            company=result["company"],
            title=result["title"],
            url=url,
            description=result["description"]
        )

        db.add(new_job)
        db.commit()
        db.refresh(new_job)
        return {"id": new_job.id, "message": "Job scraped and stored!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.put("/jobs/{job_id}/status")
def update_status(job_id: int, new_status: str, db: Session = Depends(get_db)):
    job = db.query(models.Job).filter(models.Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    job.status = new_status # type: ignore
    db.commit()
    db.refresh(job)
    return job


# python -m app.main
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
