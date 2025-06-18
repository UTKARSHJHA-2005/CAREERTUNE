// This is the page where user tracks its applications.
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react"; // Clerk Auth
import supabase from "../utils/supabase2"; // Supabase
import { Link } from "react-router-dom"; // Link Routing
import Navbar from "../components/Navbar"; // Navbar Component
import AOS from "aos"; // AOS 
import "aos/dist/aos.css";

export default function MyJob() {
  const { user } = useUser(); // User from Clerk Auth
  const [jobs, setJobs] = useState([]); // Jobs from Supabase
  const [filteredJobs, setFilteredJobs] = useState([]); // Filtered Jobs
  const [search, setSearch] = useState(""); // Search Input
  const [statusFilter, setStatusFilter] = useState("All"); // Status Filter
  const [company, setCompany] = useState(""); // Company Filter
  const userId = user?.id; // User ID from Clerk Auth

  // AOS initialization
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Status Styles
  const statusStyles = {
    Applied: "bg-blue-100 text-blue-600",
    Processing: "bg-yellow-100 text-yellow-600",
    Rejected: "bg-red-100 text-red-600",
    Hired: "bg-green-100 text-green-600",
  };

  // Fetch Applications from Supabase
  useEffect(() => {
    const fetchJobs = async () => {
      if (!userId) return; // No User ID
      // Getting Applications from Supabase
      const { data, error } = await supabase
        .from("Applications")
        .select("*, Jobs(*)")
        .eq("user_id", userId);
      // Error Handling
      if (error) {
        console.error("Error fetching Applications:", error.message);
        return;
      }
      setJobs(data);
      console.log(data);
    };
    fetchJobs();
  }, [userId]);

  // Filter Applications based on search & status
  useEffect(() => {
    if (!jobs) return; // No Jobs
    // Filtering Applications based on search & status
    const filtered = jobs.filter((job) => {
      return (
        (statusFilter === "All" || job.status === statusFilter) &&
        (company === "" || job.Jobs.company?.toLowerCase().includes(company.toLowerCase())) &&
        job.Jobs.Title?.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilteredJobs(filtered);
  }, [jobs, search, statusFilter, company]);

  return (
    <>
      {/* Navbar */}
      <Navbar />
      <br />
      <div className="max-w-6xl mt-[40px] mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-600">My Applications</h1>
        </div>

        {/* Search and Filters */}
        <div data-aos="flip-up" className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search job titles..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Status Filter */}
          <div className="relative md:w-48">
            <select
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Rejected">Rejected</option>
              <option value="Hired">Hired</option>
            </select>
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Applications Table (Responsive Scroll) */}
        <div data-aos="fade-down" className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full text-sm sm:text-base">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-4 text-left font-semibold text-gray-600">Company</th>
                <th className="px-4 sm:px-6 py-4 text-center font-semibold text-gray-600">Position</th>
                <th className="px-4 sm:px-6 py-4 text-left font-semibold text-gray-600">Applied On</th>
                <th className="px-4 sm:px-6 py-4 text-center font-semibold text-gray-600">Status</th>
                <th className="px-4 sm:px-6 py-4 text-center font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-base font-medium text-blue-600">
                            {job.Jobs.Company.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{job.Jobs.Company}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-center">
                      <div className="text-gray-900">{job.Jobs.Title}</div>
                      <a
                        href={`/jobs/${job.Jobs.id}`}
                        className="text-blue-500 text-sm hover:underline"
                      >
                        View Details
                      </a>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-left">
                      <div className="flex items-center text-gray-500">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {new Date(job.created_at).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "2-digit",
                        })}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-center">
                      <span
                        className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${statusStyles[job.status]}`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-center">
                      <Link to={`/review/${job.id}`}>
                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                          Review
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center">
                    <div className="flex flex-col items-center">
                      <svg
                        className="w-12 h-12 text-gray-400 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-lg font-medium text-gray-900">No applications found</p>
                      <p className="text-sm text-gray-500">
                        Try adjusting your search or filter criteria
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}