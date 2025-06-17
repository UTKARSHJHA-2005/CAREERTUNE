import { useState, useEffect } from "react";
import { BriefcaseBusiness, Heart, Menu, X, ChevronDown, Sparkles } from "lucide-react";
import fav from "../public/fav.jpg"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Mock authentication state - replace with actual Clerk logic
  const [isSignedIn, setIsSignedIn] = useState(false);

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
    setIsOpen(!isOpen);
  };

  // Close mobile menu when clicking outside
  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  // Handle dropdown
  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gray-900/95 backdrop-blur-lg shadow-2xl border-b border-gray-700/50' 
          : 'bg-gray-900/90 backdrop-blur-sm'
      }`}>
        <div className="px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Section */}
            <div className="flex items-center">
              <a href="/" className="group flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-shadow duration-300">
                  <img src={fav} alt="" className="h-20 w-20 object-contain"/>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-pulse"></div>
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

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              
              {/* Sign Up Button - When Not Signed In */}
              {!isSignedIn && (
                <div className="hidden lg:flex items-center space-x-3">
                  <a href="/signup" className="group relative px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105">
                    <span className="relative z-10">Sign Up</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/0 group-hover:from-white/10 group-hover:to-white/5 rounded-xl transition-all duration-300"></div>
                  </a>
                </div>
              )}

              {/* User Menu - When Signed In */}
              {isSignedIn && (
                <div className="hidden lg:flex items-center space-x-4">
                  <div className="relative">
                    <button 
                      onClick={() => toggleDropdown('user')}
                      className="flex items-center space-x-2 p-2 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-bold">U</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${activeDropdown === 'user' ? 'rotate-180' : ''}`} />
                    </button>

                    {/* User Dropdown */}
                    {activeDropdown === 'user' && (
                      <div className="absolute right-0 mt-2 w-56 bg-gray-800/95 backdrop-blur-lg border border-gray-700/50 rounded-xl shadow-2xl z-50">
                        <div className="p-3 border-b border-gray-700/50">
                          <p className="text-white font-semibold">John Doe</p>
                          <p className="text-gray-400 text-sm">john@example.com</p>
                        </div>
                        <div className="py-2">
                          <a href="/my-jobs" className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors duration-200">
                            <BriefcaseBusiness className="w-4 h-4" />
                            <span>My Jobs</span>
                          </a>
                          <a href="/saved-jobs" className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors duration-200">
                            <Heart className="w-4 h-4" />
                            <span>Saved Jobs</span>
                          </a>
                          <div className="border-t border-gray-700/50 mt-2 pt-2">
                            <button className="w-full text-left px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors duration-200">
                              Manage Account
                            </button>
                            <button 
                              onClick={() => setIsSignedIn(false)}
                              className="w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors duration-200"
                            >
                              Sign Out
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300"
              >
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

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-gray-900/95 backdrop-blur-lg border-l border-gray-700/50 transform transition-transform duration-300 ease-out z-50 lg:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">CAREERTUNE</h2>
                <p className="text-xs text-gray-400">Menu</p>
              </div>
            </div>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors duration-200"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex-1 py-6">
            <div className="space-y-2 px-6">
              <a href="/my-jobs" className="block py-3 px-4 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-200">
                Applications
              </a>
              <a href="/jobs" className="block py-3 px-4 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-200">
                Jobs
              </a>
              <a href="/career-advice" className="block py-3 px-4 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-200">
                Career Advice
              </a>
            </div>

            {/* Mobile User Section */}
            {isSignedIn && (
              <div className="mt-8 px-6">
                <div className="border-t border-gray-700/50 pt-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">U</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">John Doe</p>
                      <p className="text-gray-400 text-sm">john@example.com</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <a href="/my-jobs" className="flex items-center space-x-3 py-2 px-4 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors duration-200">
                      <BriefcaseBusiness className="w-4 h-4" />
                      <span>My Jobs</span>
                    </a>
                    <a href="/saved-jobs" className="flex items-center space-x-3 py-2 px-4 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors duration-200">
                      <Heart className="w-4 h-4" />
                      <span>Saved Jobs</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Bottom Section */}
          <div className="p-6 border-t border-gray-700/50">
            {!isSignedIn ? (
              <div className="space-y-3">
                <a href="/signin" className="block w-full py-3 text-center text-gray-300 hover:text-white transition-colors duration-200">
                  Sign In
                </a>
                <a href="/signup" className="block w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-center">
                  Sign Up
                </a>
              </div>
            ) : (
              <div className="space-y-3">
                <button className="block w-full py-3 text-left text-gray-400 hover:text-white transition-colors duration-200">
                  Manage Account
                </button>
                <button 
                  onClick={() => setIsSignedIn(false)}
                  className="block w-full py-3 text-left text-red-400 hover:text-red-300 transition-colors duration-200"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;