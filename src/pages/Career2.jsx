// This the page where AI response is shown.
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function CareerResult() {
    const location = useLocation();
    const { topic, generatedText } = location.state || {};
    // Function to clean up and format AI response
    const formatText = (text) => {
        return text
            .replace(/\*/g, '') // Remove asterisks
            .replace(/\n/g, '\n') // Ensure proper paragraph spacing
            .trim();
    };
    return (
        <>
            {/* Navbar component */}
            <Navbar />
            {/* Page content */}
            <div className="min-h-screen mt-[50px] p-10">
                <h1 className="text-3xl font-bold text-center mb-8 text-darkred">{topic}</h1>
                <div className="bg-white shadow-lg rounded-2xl p-6 text-lg text-gray-800 whitespace-pre-line">
                    {generatedText ? formatText(generatedText) : "Generating AI response..."}
                </div>
            </div>
        </>
    );
}