// This is the Page where the user can posts the job.
import React, { useState } from "react";
import supabase from "../utils/supabase2"; // supabase
import { ToastContainer,toast } from "react-toastify"; // Notification
import { useUser } from "@clerk/clerk-react"; // Clerk Auth
import { useNavigate } from "react-router-dom"; // Navigation
import { Briefcase, Building2, MapPin, Calendar, DollarSign,Target,Award, FileText, GraduationCap, Send } from "lucide-react"; // Icons

export default function PostJob() {
    const navigate = useNavigate(); // Navigation
    const { user } = useUser(); // User Clerk
    const userId = user?.id; // User ID
    // Form Data
    const [jobData, setJobData] = useState({
        Title: "",
        Company: "",
        Location: "",
        Salary: "",
        Description: "",
        Experience: "",
        Employment: "",
        Requirement: "",
        endat: "",
        Career: ""
    });

    // Handle Change
    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    // Handle Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Insertion of data into the Jobs Table Supabase
        try {
            const { error: insertError } = await supabase.from("Jobs").insert([
                {
                    Title: jobData.Title,
                    Location: jobData.Location,
                    Description: jobData.Description,
                    isOpen: "true",
                    Salary: `${jobData.Salary} LPA`,
                    Company: jobData.Company,
                    Postedat: new Date().toISOString(),
                    endat: jobData.endat,
                    Requirement: jobData.Requirement,
                    Experience: `${jobData.Experience} years`,
                    Employment: jobData.Employment,
                    Career: jobData.Career,
                    Recruiter_id: userId,
                },
            ]);
            // Handle insertion error
            if (insertError) {
                toast.error("Failed to Job Post.");
                console.log(insertError);
            // No insertion error
            } else {
                navigate("/")
                toast.success("Job Posted successfully!");
            }
        // Handle other errors
        } catch (error) {
            toast.warn("Something went wrong. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 font-inter">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
                    <div className="text-center mb-10">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-blue-500/10 rounded-xl">
                                <Briefcase className="w-10 h-10 text-blue-500" />
                            </div>
                        </div>
                        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                            Post a Job
                        </h2>
                        <p className="text-gray-500 mt-2">Fill in the details to post a new job opportunity</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Input Fields Section */}
                        <div className="space-y-6">
                            {/* Regular Input Fields */}
                            <div className="flex items-center border-2 border-gray-200 rounded-xl bg-white/80 hover:border-blue-500 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/30 transition-all duration-300">
                                <Briefcase className="w-5 h-5 text-gray-400 ml-4" />
                                <input type="text" name="Title" placeholder="Job Title" value={jobData.Title} onChange={handleChange}
                                className="w-full p-4 bg-transparent border-none focus:outline-none focus:ring-0" required/>
                            </div>
                            <div className="flex items-center border-2 border-gray-200 rounded-xl bg-white/80 hover:border-blue-500 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/30 transition-all duration-300">
                                <Building2 className="w-5 h-5 text-gray-400 ml-4" />
                                <input type="text" name="Company" placeholder="Company Name" value={jobData.Company} onChange={handleChange}
                                className="w-full p-4 bg-transparent border-none focus:outline-none focus:ring-0" required/>
                            </div>
                            <div className="flex items-center border-2 border-gray-200 rounded-xl bg-white/80 hover:border-blue-500 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/30 transition-all duration-300">
                                <MapPin className="w-5 h-5 text-gray-400 ml-4" />
                                <input type="text" name="Location" placeholder="Location" value={jobData.Location} onChange={handleChange}
                                className="w-full p-4 bg-transparent border-none focus:outline-none focus:ring-0" required/>
                            </div>
                            {/* Experience, Salary, Employment, Career Fields */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="flex items-center border-2 border-gray-200 rounded-xl bg-white/80 hover:border-blue-500 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/30 transition-all duration-300">
                                    <GraduationCap className="w-5 h-5 text-gray-400 ml-4" />
                                    <input type="text" name="Experience" placeholder="Experience (years)" value={jobData.Experience} 
                                    onChange={handleChange} className="w-full p-4 bg-transparent border-none focus:outline-none focus:ring-0"/>
                                </div>
                                <div className="flex items-center border-2 border-gray-200 rounded-xl bg-white/80 hover:border-blue-500 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/30 transition-all duration-300">
                                    <DollarSign className="w-5 h-5 text-gray-400 ml-4" />
                                    <input type="text" name="Salary" placeholder="Salary (LPA)" value={jobData.Salary} onChange={handleChange}
                                    className="w-full p-4 bg-transparent border-none focus:outline-none focus:ring-0"/>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="flex items-center border-2 border-gray-200 rounded-xl bg-white/80 hover:border-blue-500 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/30 transition-all duration-300">
                                    <Target className="w-5 h-5 text-gray-400 ml-4" />
                                    <input type="text" name="Employment" placeholder="Employment Type" value={jobData.Employment}
                                    onChange={handleChange} className="w-full p-4 bg-transparent border-none focus:outline-none focus:ring-0"/>
                                </div>
                                <div className="flex items-center border-2 border-gray-200 rounded-xl bg-white/80 hover:border-blue-500 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/30 transition-all duration-300">
                                    <Award className="w-5 h-5 text-gray-400 ml-4" />
                                    <input type="text" name="Career" placeholder="Career" value={jobData.Career} onChange={handleChange}
                                    className="w-full p-4 bg-transparent border-none focus:outline-none focus:ring-0"/>
                                </div>
                            </div>
                            {/* Job Description and Requirement Fields */}
                            <div className="space-y-6">
                                <div className="flex flex-col border-2 border-gray-200 rounded-xl bg-white/80 hover:border-blue-500 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/30 transition-all duration-300">
                                    <div className="flex items-center px-4 pt-4">
                                        <FileText className="w-5 h-5 text-gray-400" />
                                        <span className="ml-2 text-gray-400">Job Description</span>
                                    </div>
                                    <textarea name="Description" value={jobData.Description} onChange={handleChange}
                                    className="w-full p-4 bg-transparent border-none focus:outline-none focus:ring-0 min-h-[120px]" required>
                                    </textarea>
                                </div>
                                <div className="flex flex-col border-2 border-gray-200 rounded-xl bg-white/80 hover:border-blue-500 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/30 transition-all duration-300">
                                    <div className="flex items-center px-4 pt-4">
                                        <FileText className="w-5 h-5 text-gray-400" />
                                        <span className="ml-2 text-gray-400">Job Requirements</span>
                                    </div>
                                    <textarea name="Requirement" value={jobData.Requirement} onChange={handleChange}
                                    className="w-full p-4 bg-transparent border-none focus:outline-none focus:ring-0 min-h-[120px]" required>    
                                    </textarea>
                                </div>
                            </div>
                            {/* Ending Date Field */}
                            <div className="flex items-center border-2 border-gray-200 rounded-xl bg-white/80 hover:border-blue-500 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/30 transition-all duration-300">
                                <label className="flex items-center gap-2 text-gray-500 ml-4">
                                    EndAt:
                                    <Calendar className="w-5 h-5 text-gray-400" />
                                </label>
                                <input type="date" name="endat" value={jobData.endat} onChange={handleChange}
                                className="w-full p-4 bg-transparent border-none focus:outline-none focus:ring-0"/>
                            </div>
                        </div>
                        {/* Submit Button */}
                        <button type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl hover:opacity-90 transition-all duration-300 flex items-center justify-center space-x-2 group">
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            <span>Post Job</span>
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}