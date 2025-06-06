# 🧠 Job Tracker + Resume Tailor (FastAPI + Python)

A full-stack Python project to track job applications, scrape job descriptions from remote job boards, and (soon) generate tailored content like resumes and cover letters.

Built by Dillon Sheffield.

---

## 🚀 Features

- 🗂️ Track job applications (company, title, URL, status)
- 🌐 Scrape job listings from sites like **We Work Remotely** using a real browser
- 🧠 Smart auto-formatting of scraped job descriptions
- ✅ Toggle application status (Applied / Not Applied) in real time
- 💬 (Planned) AI-powered resume tailoring and cover letter generation
- ⚡ Fast, animated React frontend (Vite + Tailwind + Framer Motion)
- 🧠 FastAPI backend with SQLite database

---

## 🎥 Demo

![Job Tracker Demo](./demo.gif)

---

## 🔧 Tech Stack

- Python 3.11+
- FastAPI
- Uvicorn (ASGI server)
- SQLAlchemy + SQLite
- BeautifulSoup
- Selenium + [undetected-chromedriver](https://github.com/ultrafunkamsterdam/undetected-chromedriver)
- React (Vite)
- Tailwind CSS
- Framer Motion
- Axios

---

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/job-tracker.git
cd job-tracker
```

### 2. Set Up the Backend

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
python -m app.main
```

Open your browser at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) to test the API.

### 5. Set Up the Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit: http://localhost:5173 to view the app.

---

## 📦 API Endpoints

- `POST /scrape?url=` – Scrape a job listing and store it
- `GET /jobs` – List all saved jobs
- `POST /jobs` – Manually add a job
- `PUT /jobs/{job_id}/status?new_status=Applied|Not Applied` – Toggle job status

---

## 🧪 Example Scrape URL

```
https://weworkremotely.com/remote-jobs/sole-bicycles-head-bookkeeper
```

---

## 📌 Notes

- Chrome must be installed for browser scraping to work
- Jobs on sites with aggressive bot protection (e.g., Indeed) require full browser automation or may block scraping
- Scraping runs in a real browser using undetected-chromedriver
- This project uses `undetected-chromedriver` to bypass basic Cloudflare and bot checks
- Auto-formatting improves readability of pasted job descriptions

---

## 💡 Future Plans

- 🧠 Resume tailoring with OpenAI
- 📄 Export to CSV or Markdown
- 🏷️ Tag and filter jobs by tech stack or location
- 🖥️ Responsive dashboard frontend

---

## 🧑‍💻 Author

**Dillon Sheffield**  
GitHub: [@explainedlake](https://github.com/explainedlake)
