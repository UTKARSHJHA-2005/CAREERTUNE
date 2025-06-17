// This the page where user sees all the opened jobs.
import React, { useEffect, useState } from 'react';
import { usefetch } from '../hooks/usefetch'; // Custom Hook
import { useUser } from '@clerk/clerk-react'; // Clerk Auth
import { Link } from 'react-router-dom'; // Navigation
import { getJobs } from '../utils/api'; // API for getting jobs
import { Search, MapPin, Building2, ArrowRight, Clock } from 'lucide-react'; // Icons
import supabase from '../utils/supabase2'; // Supabase
import Navbar from '../components/Navbar'; // Navbar Component
import AOS from 'aos'; //AOS
import 'aos/dist/aos.css';

export default function ModernJobSearch() {
    const { user } = useUser(); // User
    const [location, setLocation] = useState(""); // Location
    const [company, setCompany] = useState(""); // Company
    const [filteredJobs, setFilteredJobs] = useState([]); // Filtered Jobs
    const [searchQuery, setSearchQuery] = useState(""); // Search 
    const { fn, data: allJobs, isReady } = usefetch(getJobs, {}); // fn fetching the data, allJobs contains the data, isReady is whether data is fully loaded.
    const [appliedJobs, setAppliedJobs] = useState(new Set()); // Store applied job IDs
    const userId = user?.id; // User ID

    // AOS initialization
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    // Fetching applied jobs from Applications table in supabase
    useEffect(() => {
        // If no jobs found
        if (!allJobs || allJobs.length === 0) return;
        const fetchAppliedJobs = async () => {
            // Fetching the data from Applications table
            const { data, error } = await supabase
                .from("Applications")
                .select("job_id")
                .eq("user_id", userId);
            // Error in fetching
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
        if (isReady) {
            fn();
        }
    }, [isReady]);

    // Filter jobs based on location,company,searchQuery
    useEffect(() => {
        if (!allJobs) return;
        const filtered = allJobs.filter(job => {
            return (
                job.Title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                (!location || job.Location.toLowerCase().includes(location.toLowerCase())) &&
                (!company || job.Company.toLowerCase().includes(company.toLowerCase()))
            );
        });
        setFilteredJobs(prevJobs => {
            const isSame = JSON.stringify(prevJobs) === JSON.stringify(filtered);
            return isSame ? prevJobs : filtered;
        });
    }, [allJobs, searchQuery, location, company]);

    return (
        <>
            {/* Navbar */}
            <Navbar />
            <div className="min-h-screen p-8 bg-gradient-to-br mt-[40px] from-indigo-50 to-purple-100">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div data-aos="fade-down" className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-10 mb-10">
                        <h1 className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-10">
                            Discover Your Dream Career
                        </h1>
                        {/* Search bars */}
                        <div className="space-y-6">
                            <div className="flex space-x-4">
                                <div className="relative flex-grow">
                                    <input
                                        type="text"
                                        placeholder="Search jobs, keywords..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-14 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 text-lg" />
                                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                                </div>
                                <button className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4 rounded-2xl shadow-lg">
                                    <ArrowRight size={24} />
                                </button>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                {[{ placeholder: "Location", icon: MapPin, value: location, setValue: setLocation },
                                { placeholder: "Company", icon: Building2, value: company, setValue: setCompany }
                                ].map((input, index) => (
                                    <div key={index} className="relative">
                                        <input
                                            type="text"
                                            placeholder={input.placeholder}
                                            value={input.value}
                                            onChange={(e) => input.setValue(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/30" />
                                        <input.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Jobs */}
                    <div className="w-full">
                        <div data-aos="flip-up" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredJobs.map(job => (
                                <Link key={job.id} to={`/jobs/${job.id}`}>
                                    <div className="bg-white/80 hover:scale-110 transition-all duration-300 ease-in backdrop-blur-lg rounded-3xl shadow-lg p-6 border border-white/20">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-1">{job.Title}</h2>
                                        <p className="text-gray-500 mt-2 text-sm">{job.Company}</p>
                                        <p className="bg-green-100 text-green-700 mt-2 px-3 py-1 rounded-full text-sm font-semibold">
                                            {job.Salary}
                                        </p>
                                        <p className="text-gray-600 mb-4 mt-4 line-clamp-3">{job.Description}</p>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center space-x-3 text-gray-500">
                                                <MapPin size={16} />
                                                <span className="text-sm">{job.Location}</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-gray-400">
                                                <Clock size={16} />
                                                <span className="text-xs">{job.Postedat} - {job.endat}</span>
                                            </div>
                                        </div>
                                        {/* Apply Now Button */}
                                        <button onClick={() => {
                                            localStorage.setItem("selectedJobId", job.id);
                                            window.location.href = `/applyjob/${job.id}`;
                                        }}
                                            className={`mt-4 px-6 py-2.5 text-white rounded-full ${appliedJobs.has(job.id)
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-110 transition-all duration-300 ease-in"
                                                }`} disabled={appliedJobs.has(job.id)}>
                                            {appliedJobs.has(job.id) ? "Applied" : "Apply Now"}
                                        </button>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}