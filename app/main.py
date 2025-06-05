from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas, database

from .utils.scraper import scrape_wework_stealth

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()


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


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
