// This the page where user applies for the job.
import React from "react";
import { useState, useEffect } from "react"; // State management
import { useUser } from "@clerk/clerk-react"; // User
import { ToastContainer, toast } from "react-toastify"; // Notification
import { useNavigate, useParams } from "react-router-dom"; // Navigation
import { File, Upload } from "lucide-react"; // Icons
import supabase from "../utils/supabase2"; // Supabase client

export default function JobApply() {
    const navigate = useNavigate(); // Navigation
    const { jobid } = useParams(); // Job ID from URL
    const [uploading, setUploading] = useState(false); // Uploading state
    const [jobId, setJobId] = useState(null); // Job ID
    const { user } = useUser(); // User
    const userId = user?.id; // User ID
    const [formErrors, setFormErrors] = useState({}); // Form errors
    const [formData, setFormData] = useState({ // Form data
        name: "",
        email: "",
        phone: "",
        resume: null,
        coverLetter: "",
        linkedIn: "",
        experience: ""
    });

    // Fetch job ID from Jobs table in supabase
    useEffect(() => {
        async function fetchJobId() {
            const { data, error } = await supabase
                .from("Jobs")
                .select("id")
                .eq("id", jobid)
                .single();
            // Handle errors
            if (error) {
                console.error("Error fetching job ID:", error);
                return;
            }
            setJobId(data.id);
        }
        fetchJobId();
    }, [jobid]);

    // Form validation
    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) {
            errors.name = "Name is required";
        } else if (formData.name.length < 3) {
            errors.name = "Name must be at least 3 characters";
        }
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Invalid email format";
        }
        if (!formData.phone.trim()) {
            errors.phone = "Phone number is required";
        } else if (formData.phone.replace(/\D/g, '').length < 10) {
            errors.phone = "Phone number must be at least 10 digits";
        }
        if (!formData.resume) {
            errors.resume = "Resume is required";
        }
        if (!formData.coverLetter.trim()) {
            errors.coverLetter = "Cover letter is required";
        } else if (formData.coverLetter.length < 100) {
            errors.coverLetter = "Cover letter must be at least 100 characters";
        }
        if (formData.linkedIn && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(formData.linkedIn)) {
            errors.linkedIn = "Invalid LinkedIn URL";
        }
        if (!formData.experience.trim()) {
            errors.experience = "Experience is required";
        }
        setFormErrors(errors); // Update form errors
        return Object.keys(errors).length === 0; // Return true if there are no errors
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "resume" && files) {
            // Validate file type and size
            const file = files[0];
            const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!validTypes.includes(file.type)) { // Check file type
                setFormErrors(prev => ({
                    ...prev,
                    resume: "Invalid file type. Please upload PDF or Word document"
                }));
                toast.info("Invalid file type. Please upload PDF or Word document");
                return;
            }
            if (file.size > 10 * 1024 * 1024) { // 10MB limit
                setFormErrors(prev => ({
                    ...prev,
                    resume: "File size must be less than 10MB"
                }));
                toast.info("File size must be less than 10MB");
                return;
            }
            setFormData(prev => ({ ...prev, [name]: file })); // Update form data
            setFormErrors(prev => ({ ...prev, resume: null })); // Clear error
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
            // Clear error when user starts typing
            if (formErrors[name]) {
                setFormErrors(prev => ({ ...prev, [name]: null }));
            }
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        if (!validateForm()) { // Validate form
            return;
        }
        if (!jobid) { // Check if job ID is available
            alert("Job ID not found!");
            return;
        }
        setUploading(true);
        try {
            const file = formData.resume; // Get the selected file
            // Check if a file is selected
            if (!file) { 
                toast.info("Please upload a resume.");
                setUploading(false);
                return;
            }
            // File path in Supabase storage by generating unique name and extension
            const fileExt = file.name.split('.').pop(); 
            const fileName = `${Date.now()}_${userId}.${fileExt}`; 
            const filePath = `Resume/${fileName}`;
            // Upload resume to Supabase storage
            const { error: uploadError } = await supabase.storage 
                .from("Resume")
                .upload(filePath, file, {
                    cacheControl: "3600",
                    upsert: false,
                    contentType: file.type
                });
            // Handle upload errors
            if (uploadError) {
                toast.error("Resume upload failed.");
                console.error("Upload error:", uploadError);
                setUploading(false);
                return;
            }
            // Get public URL of the uploaded resume
            const { data: publicUrlData } = supabase.storage
                .from("Resume")
                .getPublicUrl(filePath);
            const resumeUrl = publicUrlData.publicUrl;
            // Insert application data into Applications table in Supabase
            const { error: insertError } = await supabase
                .from("Applications")
                .insert([
                    {
                        Name: formData.name,
                        Email: formData.email,
                        Phone: formData.phone,
                        Resume: resumeUrl,
                        coverLetter: formData.coverLetter,
                        LinkedIn: formData.linkedIn,
                        Experience: formData.experience,
                        user_id: userId,
                        job_id: jobid,
                        status: "Applied",
                    },
                ]);
            // Handle insert errors
            if (insertError) {
                toast.warn("Failed to submit application.");
                console.error("Insert error:", insertError);
            } else {
                toast.success("Application submitted successfully!");
                navigate("/jobs");
            }
        // Handle submission errors
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.error("Submission error:", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700">
                    <h1 className="text-2xl font-bold text-white text-center">
                        Job Application
                    </h1>
                    {jobId && (
                        <p className="text-center text-blue-100 mt-2">
                            Application ID: {jobId}
                        </p>
                    )}
                </div>
                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {/* Personal Information Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name Section */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Name"/>
                            {formErrors.name && (
                                <p className="text-sm text-red-500">{formErrors.name}</p>
                            )}
                        </div>
                        {/* Email Section */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Valid Email only"
                            />
                            {formErrors.email && (
                                <p className="text-sm text-red-500">{formErrors.email}</p>
                            )}
                        </div>
                        {/* Phone Number */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Please include country code"/>
                            {formErrors.phone && (
                                <p className="text-sm text-red-500">{formErrors.phone}</p>
                            )}
                        </div>
                        {/* Experience of work */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Years of Experience
                            </label>
                            <input type="text" name="experience" value={formData.experience} onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Experience"/>
                            {formErrors.experience && (
                                <p className="text-sm text-red-500">{formErrors.experience}</p>
                            )}
                        </div>
                    </div>
                    {/* LinkedIn Section */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            LinkedIn Profile
                        </label>
                        <input type="url" name="linkedIn" value={formData.linkedIn} onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Valid Link only"/>
                        {formErrors.linkedIn && (
                            <p className="text-sm text-red-500">{formErrors.linkedIn}</p>
                        )}
                    </div>
                    {/* Cover Letter Section */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Cover Letter(Write Main Section Only)
                        </label>
                        <textarea name="coverLetter" value={formData.coverLetter} onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors min-h-[200px] resize-y"
                            placeholder="Tell us why you're the perfect fit for this role..."/>
                        {formErrors.coverLetter && (
                            <p className="text-sm text-red-500">{formErrors.coverLetter}</p>
                        )}
                    </div>
                    {/* Resume Upload Section */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Resume
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors cursor-pointer bg-gray-50">
                            <div className="space-y-1 text-center">
                                <File className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                    <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                                        <span>Upload a file</span>
                                        <input type="file" name="resume" className="sr-only"
                                            onChange={handleInputChange}
                                            accept=".pdf,.doc,.docx"/>
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">
                                    PDF, DOC, DOCX up to 10MB
                                </p>
                                {formData.resume && (
                                    <p className="text-sm text-green-600">
                                        Selected: {formData.resume.name}
                                    </p>
                                )}
                            </div>
                        </div>
                        {formErrors.resume && (
                            <p className="text-sm text-red-500">{formErrors.resume}</p>
                        )}
                    </div>
                    {/* Submit Button */}
                    <button type="submit" disabled={uploading || !jobId}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        {uploading ? (
                            <div className="flex items-center justify-center">
                                <Upload className="w-5 h-5 mr-2 animate-spin" />
                                Submitting...
                            </div>
                        ) : (
                            "Submit Application"
                        )}
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}