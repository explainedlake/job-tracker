import React from "react";
import { motion } from "framer-motion";

export default function JobCard({ job, expanded, onExpand, onCollapse, onToggleStatus }) {
  return (
    <motion.div
      layout
      className={`bg-white p-6 rounded-lg shadow-md cursor-pointer transition-all duration-300 ${expanded ? "col-span-full max-w-3xl mx-auto" : "hover:shadow-lg"}`}
    >
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-xl font-semibold">{job.title}</h2>
          <p className="text-sm text-gray-500">{job.company}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleStatus();
          }}
          className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${job.status === "Applied" ? "bg-green-500 text-white" : "bg-yellow-400 text-black"}`}
        >
          {job.status}
        </button>
      </div>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="mt-4 text-sm text-gray-800 whitespace-pre-wrap">
            {job.descriptionComponent}
          </div>
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-blue-600 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            View Listing ↗
          </a>
          <div className="mt-4 text-right">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCollapse();
              }}
              className="text-sm text-gray-500 hover:underline"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
