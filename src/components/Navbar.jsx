// This is the navbar component which is the head of the web page.
import { useState, useEffect } from "react"; 0
import { BriefcaseBusiness, Heart, Menu, X, ChevronDown, Sparkles } from "lucide-react"; // Icons
import fav from "../public/fav.jpg"// Image
import AOS from 'aos'; // AOS
import 'aos/dist/aos.css';
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"; // Clerk

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Opening of menu in mobile view
  const [scrolled, setScrolled] = useState(false); // Scrolling
  const [activeDropdown, setActiveDropdown] = useState(null); // Dropdown

  // AOS initialization
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Close mobile menu when clicking outside
  const closeMobileMenu = (e) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  // Handle dropdown
  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-gray-900/95 backdrop-blur-lg shadow-2xl border-b border-gray-700/50'
        : 'bg-gray-900/90 backdrop-blur-sm'
        }`}>
        <div className="px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center">
              <a href="/" className="group flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
                <div className="relative">
                  {/* <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-shadow duration-300">
                    <img src={fav} alt="" className="h-20 w-20 object-contain" />
                  </div> */}
                  <img src={fav} alt="" className="h-12 w-12 object-contain" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    CAREERTUNE
                  </h1>
                  <p className="text-xs text-gray-400 -mt-1">Find Your Dream Job</p>
                </div>
              </a>
            </div>
            {/* Desktop Navigation */}
            <SignedIn>
              <div className="hidden lg:flex items-center space-x-1">
                <a href="/my-jobs" className="group relative px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300">
                  <span className="relative z-10">Applications</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-lg transition-all duration-300"></div>
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                </a>
                <a href="/jobs" className="group relative px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300">
                  <span className="relative z-10">Jobs</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-lg transition-all duration-300"></div>
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                </a>
                <a href="/career-advice" className="group relative px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300">
                  <span className="relative z-10">Career Advice</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-lg transition-all duration-300"></div>
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                </a>
              </div>
            </SignedIn>
            <div className="flex items-center space-x-4">
              {/* Sign Up Button - When Not Signed In */}
              <SignedOut>
                <div className="flex items-center space-x-3">
                  <a href="/signup"
                    className="group relative px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105">
                    <span className="relative z-10">Sign Up</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/0 group-hover:from-white/10 group-hover:to-white/5 rounded-xl transition-all duration-300"></div>
                  </a>
                </div>
              </SignedOut>
              {/* User Menu - When Signed In */}
              <SignedIn>
                <UserButton appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}>
                  <UserButton.MenuItems>
                    <UserButton.Link label="My Jobs" labelIcon={<BriefcaseBusiness size={15} />} href="/my-jobs" />
                    <UserButton.Link label="Saved Jobs" labelIcon={<Heart size={15} />} href="/saved-jobs" />
                    <UserButton.Action label="manageAccount" />
                  </UserButton.MenuItems>
                </UserButton>
              </SignedIn>
              {/* Mobile Menu Button */}
              <button onClick={toggleMenu} className="lg:hidden p-2 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300">
                {isOpen ? (
                  <X className="w-6 h-6 text-gray-300" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}
      {isOpen && (
        <div data-aos="fade-down"
          className="fixed top-0 right-0 h-full w-[90vw] max-w-xs bg-gray-900/95 backdrop-blur-lg border-l border-gray-700/50 transform transition-transform duration-300 ease-out z-50 lg:hidden translate-x-0">
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
              <div className="flex items-center space-x-3">
                {/* <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <img src={fav} alt="" className="h-20 w-20 object-contain" />
                </div> */}
                <img src={fav} alt="" className="h-20 w-20 object-contain" />
                <h2 className="text-lg font-bold text-white">CAREERTUNE</h2>
              </div>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors duration-200"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            {/* Mobile Navigation Links */}
            <SignedIn>
              <div className="flex-1 py-6">
                <div className="space-y-2 px-6">
                  <a href="/my-jobs" onClick={closeMobileMenu} className="block py-3 px-4 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-200">
                    Applications
                  </a>
                  <a
                    href="/jobs"
                    onClick={closeMobileMenu}
                    className="block py-3 px-4 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-200"
                  >
                    Jobs
                  </a>
                  <a href="/career-advice" onClick={closeMobileMenu} className="block py-3 px-4 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-200">
                    Career Advice
                  </a>
                </div>
              </div>
            </SignedIn>
            {/* Mobile Bottom Section */}
            <div className="px-6 pb-6">
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: 'w-10 h-10',
                    },
                  }}
                >
                  <UserButton.MenuItems>
                    <UserButton.Link
                      label="My Jobs"
                      labelIcon={<BriefcaseBusiness size={15} />}
                      href="/my-jobs"
                    />
                    <UserButton.Link
                      label="Saved Jobs"
                      labelIcon={<Heart size={15} />}
                      href="/saved-jobs"
                    />
                    <UserButton.Action label="manageAccount" />
                  </UserButton.MenuItems>
                </UserButton>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
