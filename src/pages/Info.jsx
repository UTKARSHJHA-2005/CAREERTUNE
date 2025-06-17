// This is the page where user can see the information about the human adviser.
import React, { useEffect, useState } from "react";
import { getAdviserById } from "../utils/api"; // API for getting single adviser info.
import { useParams } from "react-router-dom"; // 
import { motion } from "framer-motion"; // Animation
import { Mail, Phone, MapPin, Briefcase, HelpCircle } from "lucide-react"; // Icons

// Function to format paragraph.
const formatParagraphs = (text) => {
  if (!text) return [];
  return text.split('\n').filter(para => para.trim() !== '');
};

export default function SingleAdviser() {
  const { index } = useParams();// Getting the index for the advisor info
  const [adviser, setAdviser] = useState(null); // State for advisers
  const [loading, setLoading] = useState(true); // State for loader

  // Fetching adviser data from the database when index mounts.
  useEffect(() => {
    if (!index) {
      console.error("Error: Adviser ID is undefined.");
      setLoading(false);
      return;
    }
    async function fetchData() {
      const data = await getAdviserById(index);
      setAdviser(data);
      setLoading(false);
    }
    fetchData();
  }, [index]);

  // Loader
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If no advisors found
  if (!adviser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <div className="text-4xl mb-4">👤</div>
          <h2 className="text-xl font-bold text-gray-800">Adviser Not Found</h2>
          <p className="mt-2 text-gray-600">We couldn't find this adviser in our database.</p>
        </div>
      </div>
    );
  }
  const aboutParagraphs = formatParagraphs(adviser.About); // Formatting the About section paragraphs
  const helpParagraphs = formatParagraphs(adviser.Thought); // Formatting the How will I help you section paragraphs

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          {/* Profile Image */}
          <div className="bg-blue-600 h-32 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-blue-600 border-4 border-white shadow-lg">
                {adviser.Name.charAt(0)}
              </div>
            </div>
          </div>
          {/* Profile Details */}
          <div className="pt-20 pb-8 px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{adviser.Name}</h1>
            <div className="flex items-center text-gray-600 mb-4">
              <Briefcase size={18} className="mr-2" />
              <span>{adviser.Posts} at {adviser.Company}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin size={18} className="mr-2" />
              <span>{adviser.Location}</span>
            </div>
          </div>
        </div>
        {/* About Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About</h2>
          <div className="space-y-4">
            {aboutParagraphs.map((para, index) => (
              <p key={index} className="text-gray-700 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </motion.div>
        {/* How They Will Help You Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            <div className="flex items-center">
              <HelpCircle size={24} className="mr-2 text-blue-600" />
              How I Will Help You
            </div>
          </h2>
          <div className="space-y-4">
            {helpParagraphs.map((para, index) => (
              <p key={index} className="text-gray-700 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </motion.div>
        {/* Contact Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-center text-gray-700">
              <Mail size={20} className="mr-3 text-blue-600" />
              <span>{adviser.Email}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Phone size={20} className="mr-3 text-blue-600" />
              <span>{adviser.Phone}</span>
            </div>
          </div>
          <button className="mt-6 w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105">
            Contact Me
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
