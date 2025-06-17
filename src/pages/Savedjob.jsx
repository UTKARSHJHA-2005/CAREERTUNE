// This is the page where user sees the saved jobs
import React, { useState, useEffect } from "react";
import { SavedJobs } from "../utils/api"; // Saved Job api
import supabase from "../utils/supabase2"; // Supabase
import { useUser } from "@clerk/clerk-react"; // Clerk Auth
import { Search, MapPin, Building2, Clock, Bookmark, Briefcase } from "lucide-react"; // Icons
import { Link } from "react-router-dom"; // Navigation
import usefetch from "../hooks/usefetch"; // Custom Hook
import AOS from "aos"; // AOS 
import "aos/dist/aos.css";

export default function Savedjob() {
    const { user } = useUser();
    const [filteredJobs, setFilteredJobs] = useState([]); // Filtered Jobs
    const [location, setLocation] = useState(""); // Location
    const [company, setCompany] = useState(""); // Company
    const [searchQuery, setSearchQuery] = useState(""); // Search 
    const [appliedJobs, setAppliedJobs] = useState(new Set()); // Applied Jobs
    const { fn, data: allJobs, isReady } = usefetch(SavedJobs, {}); // fn fetching the data, allJobs contains the data, isReady is whether data is fully loaded.
    const userId = user?.id; // User ID

    // AOS initialization
      useEffect(() => {
        AOS.init({ duration: 1000 });
      }, []);

    // Fetch applied jobs from Applications table supabase
    useEffect(() => {
        if (!allJobs || allJobs.length === 0) return;
        const fetchAppliedJobs = async () => {
            // Fetching the data from Applications table
            const { data, error } = await supabase
                .from("Applications")
                .select("job_id")
                .eq("user_id", userId);
            // Fetching error
            if (error) {
                console.error("Error fetching applications:", error.message);
                return;
            }
            // Creates a set of applied job IDs
            const appliedJobIds = new Set(data.map(app => app.job_id));
            setAppliedJobs(appliedJobIds);
        };
        fetchAppliedJobs();
    }, [allJobs]);

    // If data is loaded, then data fetching should start.
    useEffect(() => {
        if (isReady) fn();
    }, [isReady]);

    // 
    useEffect(() => {
        // If allJobs is array
        if (!Array.isArray(allJobs)) return;
        // Filter jobs based on location,company,searchQuery
        const filtered = allJobs.filter(job => {
            return (
                job.title?.toLowerCase().includes(searchQuery.toLowerCase()) &&
                (!location || job.location?.toLowerCase().includes(location.toLowerCase())) &&
                (!company || job.company?.toLowerCase().includes(company.toLowerCase()))
            );
        });
        // Update state if filtered list is different from previous list
        setFilteredJobs(prevJobs => {
            const isSame = JSON.stringify(prevJobs) === JSON.stringify(filtered);
            return isSame ? prevJobs : filtered;
        });
    }, [allJobs, searchQuery, location, company]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 p-8 font-inter">
            <div className="w-full">
                <div data-aos="flip-down" className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12 mb-10 overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-center mb-8">
                            <Bookmark className="text-blue-600 mr-3" size={32} />
                            <h1 className="text-6xl font-black text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                                Saved Jobs
                            </h1>
                        </div>
                        {/* Search bars */}
                        <div className="space-y-8">
                            <div className="flex space-x-4">
                                <div className="relative flex-grow group">
                                    <input type="text" placeholder="Search jobs, keywords..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-14 pr-4 py-5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 text-lg transition-all duration-300 bg-white/50 backdrop-blur-sm group-hover:bg-white"/>
                                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" size={24} />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { placeholder: "Location", icon: MapPin, value: location, setValue: setLocation },
                                    { placeholder: "Company", icon: Building2, value: company, setValue: setCompany }
                                ].map((input, index) => (
                                    <div key={index} className="relative group">
                                        <input type="text" placeholder={input.placeholder} value={input.value} onChange={(e) => input.setValue(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-300 bg-white/50 backdrop-blur-sm group-hover:bg-white"/>
                                        <input.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" size={20} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Jobs */}
                <div data-aos="flip-up" className="w-full">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredJobs.map(job => (
                            <Link key={job.id} to={`/saved-jobs/${job.id}`}>
                                <div className="group bg-white/90 hover:bg-white backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl p-8 border border-white/20 transition-all duration-500 ease-out hover:-translate-y-2">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">{job.title}</h2>
                                            <p className="text-gray-500 flex items-center">
                                                <Briefcase className="mr-2" size={16} />
                                                {job.company}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="inline-flex bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                                            {job.salary}
                                        </p>
                                        <p className="text-gray-600 line-clamp-3">{job.description}</p>
                                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                            <div className="flex items-center space-x-3 text-gray-500">
                                                <MapPin size={16} />
                                                <span className="text-sm">{job.location}</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-gray-400">
                                                <Clock size={16} />
                                                <span className="text-xs">{job.posted_at} - {job.endat}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}