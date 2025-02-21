// Navbar component
import React, { useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"; // Clerk components
import { BriefcaseBusiness, Heart } from "lucide-react"; // Icons
import { Link } from "react-router-dom"; // Navigation
import logo from '../public/logo.png' // Logo

const Navbar = () => {
  const {isOpen, setIsOpen} = useState(false); // State for the menu
  const [showsignin, setshowsignin] = useState(false); // State for the sign in button

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-16">
            {/* Logo and menu button */}
            <Link to="/">
              <div className="flex flex-row gap-2 items-center">
                <img src={logo} alt="logo" className="h-10 w-8" />
                <p className="text-blue-800 font-bold text-2xl">CAREERTUNE</p>
              </div>
            </Link>
            <div className="flex items-center md:hidden">
              <button onClick={toggleMenu} type="button" className="p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  )}
                </svg>
              </button>
            </div>
            {/* Navigation links */}
            <div className="hidden md:flex md:space-x-8">
            <a href="/my-jobs" className="text-gray-700 hover:text-blue-600 font-medium">Applications</a>
              <a href="/jobs" className="text-gray-700 hover:text-blue-600 font-medium">Jobs</a>
              <a href="/career-advice" className="text-gray-700 hover:text-blue-600 font-medium">Career Advice</a>
            </div>
            {/* Sign up button: IF the user is signed out */}
            <SignedOut>
              <div className="hidden md:flex md:items-center md:ml-6">
                <a href="/signup" className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Sign Up
                </a>
              </div>
            </SignedOut>
            {/* User menu: IF the user is signed in */}
            <SignedIn>
              <UserButton appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}>
                <UserButton.MenuItems>
                  <UserButton.Link label="My Jobs" labelIcon={<BriefcaseBusiness size={15} />} href="/my-jobs"/>
                  <UserButton.Link label="Saved Jobs" labelIcon={<Heart size={15} />} href="/saved-jobs"/>
                  <UserButton.Action label="manageAccount" />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
          </div>
        </div>
      </nav>
      {/* Mobile menu */}
      <div className={`fixed inset-0 w-full h-full bg-white transform ${isOpen ? "translate-x-0" : "translate-x-full"} 
      transition-transform duration-300 ease-in-out z-50 flex flex-col items-center justify-center`}>
        <button onClick={toggleMenu} className="absolute top-6 right-6 p-2 text-gray-700 hover:text-gray-900 text-3xl">
          &times;
        </button>
        <a href="/jobs" className="text-3xl text-gray-700 hover:text-blue-600 font-medium my-4">Jobs</a>
        <a href="/companies" className="text-3xl text-gray-700 hover:text-blue-600 font-medium my-4">Companies</a>
        <a href="/career-advice" className="text-3xl text-gray-700 hover:text-blue-600 font-medium my-4">Career Advice</a>
        <SignedOut>
          <a href="/signup" className="px-6 py-3 bg-blue-600 text-white text-3xl rounded-lg hover:bg-blue-700 my-4">
            Sign Up
          </a>
        </SignedOut>
        <SignedIn>
          <UserButton appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              },
            }}>
            <UserButton.MenuItems>
              <UserButton.Link label="My Jobs" labelIcon={<BriefcaseBusiness size={15} />} href="/my-jobs"/>
              <UserButton.Link label="Saved Jobs" labelIcon={<Heart size={15} />} href="/saved-jobs"/>
              <UserButton.Action label="manageAccount" />
            </UserButton.MenuItems>
          </UserButton>
        </SignedIn>
      </div>
      {/* Overlay */}
      {isOpen && ( <div className="fixed inset-0 w-full h-full bg-black/50 z-40" onClick={toggleMenu}></div>)}
    </>
  );
};
export default Navbar;