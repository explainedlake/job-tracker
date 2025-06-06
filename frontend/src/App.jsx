// frontend/src/App.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./components/JobCard.jsx";
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const fetchJobs = () => {
    axios.get("http://localhost:8000/jobs").then((res) => setJobs(res.data));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const formatDescription = (desc) => {
    if (!desc) return "";

    const normalized = desc
      .replace(/\n{2,}/g, "\n")
      .replace(/\n/g, "\n\n")
      .replace(/(\d)\n(\d)/g, "$1$2")
      .replace(/([a-z])\n([a-z])/gi, "$1 $2")
      .trim();

    const sections = normalized.split(/(?=Responsibilities|Qualifications|Pay & Benefits|Compensation|About|Benefits|Annual Cash Compensation Range|Schedule|The Compensation|Core Tasks\/Responsibilities|Must-Have Qualifications)/gi);

    return sections.map((section, index) => {
      const headerMatch = section.match(/^(Responsibilities|Qualifications|Pay & Benefits|Compensation|About|Benefits|Annual Cash Compensation Range|Schedule|The Compensation|Core Tasks\/Responsibilities|Must-Have Qualifications)/i);
      if (headerMatch) {
        const title = headerMatch[0];
        const body = section.replace(title, "").trim().split(/\n|\r/).filter(line => line.trim() !== "");
        return (
          <section key={index} className="mt-6">
            <h3 className="text-base font-semibold mb-2">{title}</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {body.map((point, idx) => <li key={idx}>{point.trim()}</li>)}
            </ul>
          </section>
        );
      }
      return (
        <p key={index} className="text-sm leading-relaxed mb-4 whitespace-pre-wrap">{section.trim()}</p>
      );
    });
  };

  const handleScrape = async () => {
    if (!url) return;
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await axios.post(`http://localhost:8000/scrape?url=${encodeURIComponent(url)}`);
      setUrl("");
      fetchJobs();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("❌ Failed to scrape job.");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (jobId, currentStatus) => {
    const newStatus = currentStatus === "Applied" ? "Not Applied" : "Applied";
    try {
      await axios.put(`http://localhost:8000/jobs/${jobId}/status`, null, {
        params: { new_status: newStatus },
      });
      fetchJobs();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleExpand = (jobId, event) => {
    if (event?.target?.closest("button")) return; // prevent collapse on button click
    setExpandedId(jobId);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 z-0"
        style={{
          background: "linear-gradient(120deg, #cfd9df, #e2ebf0, #deeaf6)",
          backgroundSize: "600% 600%",
          animation: "gradientShift 20s ease infinite",
          filter: expandedId !== null ? "blur(4px)" : "none",
        }}
      ></motion.div>

      <h1 className="text-3xl font-bold mb-4 text-center relative z-20">📋 Job Tracker</h1>

      <div className="max-w-2xl mx-auto mb-6 relative z-20">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Paste job URL..."
            className="flex-1 px-4 py-2 rounded-md border border-gray-300 shadow-sm"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            onClick={handleScrape}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Scraping..." : "Scrape"}
          </button>
        </div>
        {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
      </div>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-4 right-4 px-4 py-2 bg-green-500 text-white rounded shadow-lg z-50"
          >
            ✅ Job added successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expandedId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-10 bg-black"
            onClick={() => setExpandedId(null)}
          />
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-20">
        {jobs.map((job) => (
          <AnimatePresence key={job.id}>
            <motion.div
              layout
              transition={{ layout: { duration: 0.75, type: "spring", damping: 30, stiffness: 120 } }}
              onClick={(e) => handleExpand(job.id, e)}
            >
              <JobCard
                job={{ ...job, descriptionComponent: formatDescription(job.description) }}
                expanded={expandedId === job.id}
                onExpand={() => setExpandedId(job.id)}
                onCollapse={() => setExpandedId(null)}
                onToggleStatus={() => toggleStatus(job.id, job.status)}
              />
            </motion.div>
          </AnimatePresence>
        ))}
      </div>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </main>
  );
}
