// This is the page where user see the details of Saved job.
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Navigation
import { getaJob } from '../utils/api'; // API for getting details of job
import { ToastContainer,toast } from 'react-toastify'; // Notifications
import supabase from '../utils/supabase2'; // Supabase
import {
  MapPin, Building2, DollarSign, Clock, Calendar,ChevronLeft, AlertCircle, CheckCircle, ScrollText, Users, Target, Award} from 'lucide-react';// Icons
import { useUser } from '@clerk/clerk-react'; // Clerk Auth

export default function SavedjobPage() {
  const { jobid } = useParams(); // Job ID from URL
  const {user}=useUser() // Clerk Auth
  const [job, setJob] = useState(null); // Job details
  const [loading, setLoading] = useState(true);// Loading State
  const [error, setError] = useState(null); // Error state
  const [hasApplied, setHasApplied] = useState(false);// Applied
  const [isSaved, setIsSaved] = useState(false);// Saved
  const userId=user?.id;  // User ID

  // Function to remove Saved job
  const handleSaveJob = async () => {
    // Removing the job from Saved Jobs
    try {
      const { data, error } = await supabase
        .from("Saved Jobs")
        .remove([
          {
            id: jobid, 
            user_id: userId,
            title: job.Title,
            company: job.Company,
            location: job.Location,
            salary: job.Salary,
            posted_at: job.Postedat,
            description: job.Description,
          },
        ]);
      // Error in removing job
      if (error) {
        toast.error("Error removing job:", error.message);
        console.error("Error removing job:", error.message);
      } else {
        toast.success("Job removed successfully!");
        console.log("Job removed successfully:", data);
        setIsSaved(true);
      }
    // Error in saving job
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  // Check if the job is already saved when the page loads
  useEffect(() => {
    const checkSavedStatus = async () => {
      const { data, error } = await supabase
        .from("Saved Jobs")
        .select("id")
        .eq("user_id", userId) 
        .eq("id", jobid);
      // If not saved
      if (error) {
        console.error("Error checking saved status:", error.message);
      } else {
        setIsSaved(data.length > 0);
      }
    };
    checkSavedStatus();
  }, [jobid]);

  // Fetching applied jobs
  useEffect(() => {
    const fetchAppliedJobs = async () => {
        // Fetching in Applications table in supabase
        const { data, error } = await supabase
            .from("Applications")
            .select("job_id")
            .eq("user_id", userId);
        // Error in fetching
        if (error) {
            console.error("Error fetching applications:", error.message);
            return;
        }
        console.log(data)
        const appliedJobIds = new Set(data.map(app => app.job_id)); // Convert to Set for fast lookup
        setHasApplied(appliedJobIds);
    };
    fetchAppliedJobs();
}, [jobid]);
  
  // Fetching job details
  useEffect(() => {
    async function fetchJobDetails() {
      // If no job ID found
      if (!jobid) {
        setError("Invalid Job ID");
        setLoading(false);
        return;
      }
      // Fetching details
      try {
        setLoading(true);
        const data = await getaJob({ job_id: jobid });
        if (!data) {
          throw new Error("No job found or API error");
        }
        setJob(data);
      // Error in fetching
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchJobDetails();
  }, [jobid]);

  // Loader
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading job details...</p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Error Loading Job</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/saved-jobs"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }
  // No Job Found
  if (!job) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Link to="/saved-jobs" className="inline-flex items-center text-white/90 hover:text-white mb-8 transition-colors duration-200">
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Job Listings
          </Link>
          {/* Job Details Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h1 className="text-4xl font-bold mb-6">{job.Title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Company</p>
                  <p className="font-medium">{job.Company}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Location</p>
                  <p className="font-medium">{job.Location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Posted Date</p>
                  <p className="font-medium">{job.Postedat}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              {/* Job Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <ScrollText className="w-6 h-6 text-blue-600" />
                  Job Description
                </h2>
                <p className="text-gray-600 leading-relaxed">{job.Description}</p>
              </div>
              {/* Requirements */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-3 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                  Requirements
                </h2>
                <p className="text-gray-600 font-medium leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: job.Requirement.replace(/(\d\)) /g, '<br/>$1 ') }}>
                </p>
              </div>
              {/* Experience, Employment, and Career Level - Left Column */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Experience Level</p>
                    <p className="font-medium text-gray-900">{job.Experience}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Employment Type</p>
                    <p className="font-medium text-gray-900">{job.Employment}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Career Level</p>
                    <p className="font-medium text-gray-900">{job.Career}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Salary, Apply Before - Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Salary Range</p>
                    <p className="font-semibold text-gray-900">{job.Salary}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Calendar className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Apply Before</p>
                    <p className="font-semibold text-gray-900">{job.endat}</p>
                  </div>
                </div>
              </div>
              {/* Apply Now and Saved Button */}
              <Link to={"/applyjob/" + job.id}>
                <button disabled={hasApplied} className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all duration-200 mb-3">
                  {hasApplied ? "Applied" : "Apply Now"}
                </button>
              </Link>
              <button onClick={handleSaveJob} disabled={isSaved}
                className={`w-full border-2 border-blue-600 text-blue-600 py-4 px-6 rounded-xl font-semibold transition-colors duration-200 ${isSaved ? "bg-gray-200 cursor-not-allowed" : "hover:bg-blue-50"}`}>
                {isSaved ? "Saved" : "Save Job"}
              </button>;
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}