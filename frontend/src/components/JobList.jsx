import React, { useState, useRef, useEffect } from "react";
import JobCard from "./JobCard";

export default function JobList({ jobs, onToggleStatus }) {
  const [expandedId, setExpandedId] = useState(null);
  const expandedRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (expandedRef.current && !expandedRef.current.contains(event.target)) {
        setExpandedId(null);
      }
    }

    if (expandedId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expandedId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {jobs.map((job) => (
        <div
          key={job.id}
          ref={expandedId === job.id ? expandedRef : null}
          onClick={() => setExpandedId(job.id)}
        >
          <JobCard
            job={job}
            expanded={expandedId === job.id}
            onExpand={() => setExpandedId(job.id)}
            onCollapse={() => setExpandedId(null)}
            onToggleStatus={() => onToggleStatus(job.id)}
          />
        </div>
      ))}
    </div>
  );
}
