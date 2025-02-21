// This is the page where user sees its application details.
import React, { useEffect, useState } from "react";
import { getaApplication } from "../utils/api"; // API for getting application details
import { useParams } from "react-router-dom"; // Route parameters
import { motion } from "framer-motion"; // Animation

// Animation
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

// Status Badge component
const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    const statusMap = {
      Interviewing: "bg-yellow-100 text-yellow-800",
      Hired: "bg-green-100 text-green-800",
      Rejected: "bg-red-100 text-red-800",
      default: "bg-blue-100 text-blue-800"
    };
    return statusMap[status?.toLowerCase()] || statusMap.default;
  };

  // Shows status of the application
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
      {status || "Processing"}
    </span>
  );
};

// Section component
const Section = ({ title, children, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay }}
  className="bg-white rounded-xl p-6 shadow-lg mb-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
      <div className="w-2 h-8 bg-blue-500 rounded-full mr-3"></div>
      {title}
    </h2>
    {children}
  </motion.div>
);

// Field component
const Field = ({ label, value, className = "" }) => (
  <div className={`mb-4 group ${className}`}>
    <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">{label}</label>
    <div className="mt-1 text-gray-900 font-medium group-hover:text-blue-600 transition-colors duration-200">
      {value || "Not provided"}
    </div>
  </div>
);

export default function Review() {
  const { jobid } = useParams(); // Job ID from URL
  const [application, setApplication] = useState(null); // Application details
  const [loading, setLoading] = useState(true); // Loading State

  // 
  useEffect(() => {
    async function fetchApplication() {
      try {
        const data = await getaApplication(jobid);
        setApplication(data);
      } catch (error) {
        console.error("Error fetching application:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchApplication();
  }, [jobid]);

  // Loader
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="mt-4 text-blue-500 font-medium">Loading...</div>
        </div>
      </div>
    );
  }

  // If no application found
  if (!application) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} 
        className="text-center bg-white p-8 rounded-xl shadow-lg">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-gray-800">No application found</h2>
          <p className="mt-2 text-gray-600">We couldn't find an application for this job ID.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeIn} className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Application Review</h1>
          <StatusBadge status={application.status} />
        </motion.div>
        {/* Application Details - Name,Email,Phone,LinkedIn */}
        <Section title="Candidate Information" delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Name" value={application.Name} />
            <Field label="Email" value={application.Email} />
            <Field label="Phone" value={application.Phone} />
            <Field label="LinkedIn" value={application.LinkedIn} />
          </div>
        </Section>
        {/* Application Details - Experience,Cover Letter,Resume */}
        <Section title="Application Details" delay={0.4}>
          <Field label="Experience" value={application.Experience} />
          <div className="mt-6">
            <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">Cover Letter</label>
            <div className="mt-2 p-6 bg-gray-50 rounded-xl text-gray-700 leading-relaxed hover:bg-gray-100 transition-colors duration-200">
              {application.coverLetter}
            </div>
          </div>
          {application.Resume && (
            <div className="mt-6">
              <a href={application.Resume}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105">
                View Resume
              </a>
            </div>
          )}
        </Section>
        {/* Job Details - Company,Title,Location,Employment,Description */}
        <Section title="Job Details" delay={0.6}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Field label="Company" value={application.Jobs?.Company}
            className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200"/>
            <Field label="Title" value={application.Jobs?.Title} 
            className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200"/>
            <Field label="Location" value={application.Jobs?.Location}
            className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200"/>
            <Field label="Employment" value={application.Jobs?.Employment}
            className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200"/>
          </div>
          <div className="mt-6">
            <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">Job Description</label>
            <div className="mt-2 p-6 bg-gray-50 rounded-xl text-gray-700 leading-relaxed hover:bg-gray-100 transition-colors duration-200">
              {application.Jobs?.Description}
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}