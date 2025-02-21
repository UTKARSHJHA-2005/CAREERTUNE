// Hero component for Home page.
import React, { useEffect, useState } from "react";
import { SignedIn } from "@clerk/clerk-react"; // If the user is signed in
import { ArrowRight } from "lucide-react"; // Icon
// Images
import hero from "../public/Hero.png"; 
import hero2 from "../public/Hero2.png";
import hero4 from "../public/Hero4.png";
import hero6 from "../public/Hero6.png";

// Logos
const logos = [
  "https://s3.amazonaws.com/cdn.designcrowd.com/blog/100-Famous-Brand%20Logos-From-The-Most-Valuable-Companies-of-2020/google-logo.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWExbl7wgsepkPZ2g2gYpDonM0VpJrXhrcn0ND5H_QgL_75Z_LmevBAhfPE_KcAlDdKA&usqp=CAU",
  "https://www.designrush.com/uploads/users/customer-2/image_1505932873_994c47dfabbf9ec10a98c555d6fa8b13.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsLvD_jfgBJk_tUeV3nDYWxnlmWoVj5oimcA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuF93GqbNc1UPvz0h5tcp9m7zXjfW6gR3yzQ&s",
  "https://logomak.com/blog/wp-content/uploads/2023/09/Microsoft-Logo-500x163-min.png",
];

function Hero() {
  const [isVisible, setIsVisible] = useState(false); // Visibility sets to false

  // Runs only once when the component mounts
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Main Content */}
        <div className={`max-w-5xl mx-auto text-center transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight">
            Transform your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Journey
            </span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl lg:text-3xl text-gray-600 font-light max-w-3xl mx-auto">
            The only way to do great work is to love what you do.
          </p>
          {/* Shows buttons if the user is signed in */}
          <SignedIn>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <a href="/jobs"
              className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-all duration-200 transform hover:scale-105">
                Browse Jobs
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="/posts-job"
              className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-900 bg-white border-2 border-gray-900 rounded-xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-105">
                Post Job
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </SignedIn>
        </div>
        {/* Image Gallery */}
        <div className="mt-16 md:mt-20 px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <img className="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" src={hero}
                alt="Career Journey"/>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <img className="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" src={hero2}
                alt="Professional Growth"/>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300 col-span-2">
              <img className="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" src={hero6}
                alt="Workplace Success"/>
            </div>
          </div>
        </div>
        {/* Logo Carousel */}
        <div className="mt-16 bg-gray-50 py-8 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="relative max-w-7xl mx-auto overflow-hidden">
            <p className="text-center text-gray-600 mb-6">Trusted by leading companies</p>
            <div className="flex gap-8 animate-scroll">
              {[...logos, ...logos].map((logo, index) => (
                <img key={index} src={logo} alt={`Company ${index + 1}`}
                className="h-8 md:h-10 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"/>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
          display: flex;
          white-space: nowrap;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

export default Hero;