// This is the Career Advise which shows the AI advisory and human advisers.
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar"; // Navbar component
import { ArrowRight, Briefcase, Search, MapPin, Building, Plus } from "lucide-react"; // Icons
import { ToastContainer, toast } from "react-toastify"; // Notification
import { chatSession } from "../utils/AIModal"; // AI Modal
import { useNavigate, Link } from "react-router-dom"; // Navigation
import supabase from "../utils/supabase2"; // Database
import AOS from "aos"; // AOS 
import "aos/dist/aos.css";

// Topics data
const topics = [
    {
        title: "Resume & Cover Letter Tips",
        icon: "📝",
        description: "Expert guidance on crafting compelling job applications"
    },
    {
        title: "Interview Preparation",
        icon: "🎯",
        description: "Ace your interviews with proven strategies"
    },
    {
        title: "Job Search Strategies",
        icon: "🔍",
        description: "Smart approaches to finding your next opportunity"
    },
    {
        title: "Career Growth & Upskilling",
        icon: "📈",
        description: "Level up your professional development"
    },
    {
        title: "Workplace Tips & Professionalism",
        icon: "💼",
        description: "Navigate your workplace with confidence"
    },
    {
        title: "Industry Insights",
        icon: "🌟",
        description: "Stay ahead with latest industry trends"
    },
    {
        title: "Success Stories & Case Studies",
        icon: "🏆",
        description: "Learn from real-world success stories"
    },
    {
        title: "Tools & Resources",
        icon: "🛠️",
        description: "Essential resources for your career journey"
    }
];

const CareerAdvice = () => {
    const [value, setValue] = useState(""); // State for storing user input
    const [advisers, setAdvisers] = useState([]); // State for storing advisers
    const navigate = useNavigate(); // Initialize the useNavigate

    // Fetch advisers from the database when the component mounts
    useEffect(() => {
        const fetchAdvisers = async () => {
            const { data, error } = await supabase.from("Advisers").select("*");
            if (error) {
                console.error("Error fetching advisers:", error.message);
                return;
            }
            setAdvisers(data);
            console.log(data)
        };
        fetchAdvisers();
    }, []);

    // AOS initialization
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    // Function to handle input changes
    const handleInputChange = (e) => {
        setValue(e.target.value);
    };

    // Function to generate AI content based on the selected topic
    const GenerateAI = async (topic) => {
        if (!value.trim()) {
            toast.info("Please enter your role or industry.");
            return;
        }
        try {
            const FINAL_PROMPT = `Generate career advice on: ${topic} for ${value}`; // Final prompt with user input
            const result = await chatSession.sendMessage(FINAL_PROMPT); // Send the prompt to the AI model
            const generatedText = result?.response?.text() || "";// Extract the generated text from AI
            console.log("Generated AI Content:", generatedText);
            navigate("/career-result", { state: { topic, generatedText } });
            // Handle errors
        } catch (error) {
            console.error("Error generating AI content:", error.message);
            toast.error("Failed to generate AI content. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Navbar */}
            <Navbar />
            <main className="container mx-auto px-4 py-8 mt-12">
                {/* Hero Section */}
                <div data-aos="fade-down-right" className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Your AI Career Guide
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Get personalized career advice powered by AI and industry experts
                    </p>
                </div>
                {/* Search Section */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input type="text" value={value} onChange={handleInputChange} placeholder="Enter your role or industry"
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white" />
                    </div>
                </div>
                {/* Topics */}
                <div data-aos="flip-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {topics.map((topic, index) => (
                        <button
                            key={index}
                            onClick={() => GenerateAI(topic.title)}
                            className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 text-left">
                            <div className="flex items-start space-x-4">
                                <span className="text-2xl">{topic.icon}</span>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {topic.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {topic.description}
                                    </p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
                {/* Human Advisory Section */}
                <section className="mb-12">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Career Advisers
                        </h2>
                        {/* Become an Adviser */}
                        <Link to="/create-adviser">
                            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                <Plus size={20} className="mr-2" />
                                Become an Adviser
                            </button>
                        </Link>
                    </div>
                    {/* Human Advisers */}
                    <div data-aos="flip-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {advisers.map((adviser, index) => (
                            <div key={index} className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200">
                                <Link to={`/adviser/${adviser.id}`}>
                                    <div className="p-6">
                                        <div className="flex items-center space-x-4 mb-4">
                                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                                                {adviser.Name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-900">{adviser.Name}</h3>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center text-gray-600">
                                                <Building size={16} className="mr-2 text-gray-400" />
                                                {adviser.Company}
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Briefcase size={16} className="mr-2 text-gray-400" />
                                                {adviser.Posts}
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <MapPin size={16} className="mr-2 text-gray-400" />
                                                {adviser.Location}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <ToastContainer />
        </div>
    );
};

export default CareerAdvice;
