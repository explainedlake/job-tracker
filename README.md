# 🧠 Job Tracker + Resume Tailor (FastAPI + Python)

A full-stack Python project to track job applications, scrape job descriptions from remote job boards, and (soon) generate tailored content like resumes and cover letters.

Built by Dillon Sheffield.

---

## 🚀 Features

- 🗂️ Track job applications (company, title, URL, status)
- 🌐 Scrape job listings from sites like **We Work Remotely** using a real browser
- 📄 Auto-fill and store job descriptions
- 💬 (Planned) AI-powered resume tailoring and cover letter generation
- 🧠 FastAPI backend with SQLite database

---

## 🔧 Tech Stack

- Python 3.11+
- FastAPI
- Uvicorn (ASGI server)
- SQLAlchemy + SQLite
- BeautifulSoup
- Selenium + [undetected-chromedriver](https://github.com/ultrafunkamsterdam/undetected-chromedriver)

---

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/job-tracker.git
cd job-tracker
```

### 2. Create a Virtual Environment

```bash
python -m venv venv
source venv/bin/activate   # or venv\Scripts\activate on Windows
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the App

```bash
python app/main.py
```

Open your browser at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) to test the API.

---

## 📦 API Endpoints

- `POST /scrape?url=` – Scrape a job listing and store it
- `GET /jobs` – List all saved jobs
- `POST /jobs` – Manually add a job

---

## 🧪 Example Scrape URL

```
https://weworkremotely.com/remote-jobs/sole-bicycles-head-bookkeeper
```

---

## 📌 Notes

- Chrome must be installed for browser scraping to work
- Jobs on sites with aggressive bot protection (e.g., Indeed) require full browser automation
- This project uses `undetected-chromedriver` to bypass basic Cloudflare and bot checks

---

## 💡 Future Plans

- 🧠 Resume tailoring with OpenAI
- 📄 Export to CSV or Markdown
- 🏷️ Tag and filter jobs by tech stack or location
- 🖥️ Add a frontend UI (React or Svelte)

---

## 🧑‍💻 Author

**Dillon Sheffield**  
GitHub: [@explainedlake](https://github.com/explainedlake)
