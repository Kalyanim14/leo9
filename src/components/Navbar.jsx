import React, { useState, useRef, useEffect } from 'react';
import leo9 from '../assets/leo9.png';

// Sample SVG icons for the navbar
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// The Navbar component with external dropdown
const Navbar = () => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ left: 0, top: 0 });
  
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);

  // Calculate dropdown position
  const updateDropdownPosition = (ref, isServices = true) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setDropdownPosition({
        left: rect.left + rect.width / 2,
        top: rect.bottom + 8
      });
    }
  };

  // Handle clicks outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(event.target)) {
        setAboutOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to close all dropdowns when the mobile menu is closed
  const closeAllDropdowns = () => {
    setServicesOpen(false);
    setAboutOpen(false);
  };

  const handleServicesClick = () => {
    updateDropdownPosition(servicesRef, true);
    setServicesOpen(!servicesOpen);
    setAboutOpen(false);
  };

  const handleAboutClick = () => {
    updateDropdownPosition(aboutRef, false);
    setAboutOpen(!aboutOpen);
    setServicesOpen(false);
  };

  return (
    <div className="relative">
      <nav className={`w-full mb-3 h-20 shadow-md px-60 py-4 flex justify-between items-center fixed top-0 z-50 transition-colors duration-500 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        {/* Logo */}
        <div className="text-4xl  font-semibold pl-4 md:pl-20 flex items-center">
          <img src={leo9} alt="Logo" className="h-10 w-10 mr-2"/>
          leo9
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 items-center font-medium relative">
          <li className="hover:text-gray-600 cursor-pointer">Work</li>

          {/* Services Dropdown */}
          <li className="relative cursor-pointer group" ref={servicesRef}>
            <div
              className="flex items-center gap-1"
              onClick={handleServicesClick}
            >
              Services
              <span className="inline-block w-2 h-2 bg-black rounded-full" />
            </div>
          </li>

          {/* Clients */}
          <li className="hover:text-gray-600 cursor-pointer">Clients</li>

          {/* About Dropdown */}
          <li className="relative cursor-pointer group" ref={aboutRef}>
            <div
              className="flex items-center gap-1"
              onClick={handleAboutClick}
            >
              About
              <span className="inline-block w-2 h-2 bg-black rounded-full" />
            </div>
          </li>

          <li className="hover:text-gray-600 cursor-pointer">Knowledge</li>
          
          {/* Theme Toggle Button */}
          <li>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-colors duration-500 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-black'}`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <MoonIcon /> : <SunIcon />}
            </button>
          </li>

          {/* Contact Button */}
          <li>
            <button className="relative bg-black text-white px-4 py-2 rounded-md overflow-hidden group">
              <span className="absolute inset-0 bg-black transition-transform duration-300 group-hover:-translate-y-full"></span>
              <span className="relative z-10">Contact</span>
            </button>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => {
            setMobileOpen(!mobileOpen);
            closeAllDropdowns();
          }}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className={`absolute top-16 left-0 w-full shadow-lg flex flex-col gap-4 p-6 md:hidden z-50 transition-colors duration-500 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <span className="hover:text-gray-600 cursor-pointer">Work</span>
            <span
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center gap-1 cursor-pointer"
            >
              Services
              <span className="inline-block w-2 h-2 bg-black rounded-full" />
            </span>
            {servicesOpen && (
              <div className="pl-4 grid gap-3 ">
                <div className="bg-pink-200 p-3 rounded-lg group/item hover:bg-pink-300 transition-colors">
                  <div className="flex justify-between items-center">
                    <p className="font-bold">Design</p>
                    <span className="group-hover/item:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-sm mt-2">Handcraft the user experience.</p>
                </div>
                <div className="bg-purple-200 p-3 rounded-lg group/item hover:bg-purple-300 transition-colors">
                  <div className="flex justify-between items-center">
                    <p className="font-bold">Technology</p>
                    <span className="group-hover/item:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-sm mt-2">Leverage the power of code.</p>
                </div>
                <div className="bg-violet-200 p-3 rounded-lg group/item hover:bg-violet-300 transition-colors">
                  <div className="flex justify-between items-center">
                    <p className="font-bold">Marketing</p>
                    <span className="group-hover/item:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-sm mt-2">Creative strategies for brands.</p>
                </div>
              </div>
            )}

            <span className="hover:text-gray-600 cursor-pointer">Clients</span>

            <span
              onClick={() => setAboutOpen(!aboutOpen)}
              className="flex items-center gap-1 cursor-pointer"
            >
              About
              <span className="inline-block w-2 h-2 bg-black rounded-full" />
            </span>
            {aboutOpen && (
              <div className="pl-4 grid gap-3">
                <div className="bg-pink-200 p-6 rounded-lg group/item hover:bg-pink-300 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-4">
                      <p className="font-bold text-lg">About Us</p>
                    </div>
                    <div className="border-l border-gray-400 pl-4">
                      <span className="group-hover/item:translate-x-1 transition-transform text-xl">→</span>
                    </div>
                  </div>
                  <p className="text-base mt-4">
                    We are super-efficient yet humble to serve you!
                  </p>
                </div>
                <div className="bg-purple-200 p-6 rounded-lg group/item hover:bg-purple-300 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-4">
                      <p className="font-bold text-lg">Team</p>
                    </div>
                    <div className="border-l border-gray-400 pl-4">
                      <span className="group-hover/item:translate-x-1 transition-transform text-xl">→</span>
                    </div>
                  </div>
                  <p className="text-base mt-4">
                    We are proud of our experienced and accomplished team!
                  </p>
                </div>
                <div className="bg-violet-200 p-6 rounded-lg group/item hover:bg-violet-300 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-4">
                      <p className="font-bold text-lg">Career</p>
                    </div>
                    <div className="border-l border-gray-400 pl-4">
                      <span className="group-hover/item:translate-x-1 transition-transform text-xl">→</span>
                    </div>
                  </div>
                  <p className="text-base mt-4">Can you offer such experience?</p>
                </div>
              </div>
            )}

            <span className="hover:text-gray-600 cursor-pointer">Knowledge</span>
            
            {/* Theme Toggle for Mobile */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`flex items-center gap-2 p-2 rounded-full transition-colors duration-500 w-fit ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-black'}`}
            >
              {isDarkMode ? <MoonIcon /> : <SunIcon />}
              <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
            </button>

            <button className="relative bg-black text-white px-4 py-2 rounded-md overflow-hidden group">
              <span className="absolute inset-0 bg-black transition-transform duration-300 group-hover:-translate-y-full"></span>
              <span className="relative z-10">Contact</span>
            </button>
          </div>
        )}
      </nav>

      {/* External Dropdowns - Services */}
      {servicesOpen && (
        <div 
          className="fixed z-40 pointer-events-none"
          style={{
            left: '50%',
            top: '80px',
            transform: 'translateX(-50%)'
          }}
        >
          <div className={`shadow-xl rounded-xl p-4 flex gap-4 pointer-events-auto transition-colors duration-500 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="bg-pink-200 p-3 rounded-lg min-w-[200px] group/item hover:bg-pink-300 transition-colors cursor-pointer">
              <div className="flex justify-between items-center">
                <p className="font-bold text-gray-800">Design</p>
                <span className="group-hover/item:translate-x-1 transition-transform text-gray-800">→</span>
              </div>
              <p className="text-sm mt-2 text-gray-700">Handcraft the user experience.</p>
            </div>
            <div className="bg-purple-200 p-3 rounded-lg min-w-[200px] group/item hover:bg-purple-300 transition-colors cursor-pointer">
              <div className="flex justify-between items-center">
                <p className="font-bold text-gray-800">Technology</p>
                <span className="group-hover/item:translate-x-1 transition-transform text-gray-800">→</span>
              </div>
              <p className="text-sm mt-2 text-gray-700">Leverage the power of code.</p>
            </div>
            <div className="bg-violet-200 p-3 rounded-lg min-w-[200px] group/item hover:bg-violet-300 transition-colors cursor-pointer">
              <div className="flex justify-between items-center">
                <p className="font-bold text-gray-800">Marketing</p>
                <span className="group-hover/item:translate-x-1 transition-transform text-gray-800">→</span>
              </div>
              <p className="text-sm mt-2 text-gray-700">Creative strategies for brands.</p>
            </div>
          </div>
        </div>
      )}

      {/* External Dropdowns - About */}
      {aboutOpen && (
        <div 
          className="fixed z-40 pointer-events-none"
          style={{
            left: '50%',
            top: '80px',
            transform: 'translateX(-50%)'
          }}
        >
          <div className={`shadow-xl rounded-xl p-4 flex gap-4 pointer-events-auto transition-colors duration-500 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="bg-pink-200 p-3 rounded-lg min-w-[200px] group/item hover:bg-pink-300 transition-colors cursor-pointer">
              <div className="flex justify-between items-center">
                <p className="font-bold text-gray-800">About Us</p>
                <span className="group-hover/item:translate-x-1 transition-transform text-gray-800">→</span>
              </div>
              <p className="text-sm mt-2 text-gray-700">
                We are super-efficient yet humble to serve you!
              </p>
            </div>
            <div className="bg-purple-200 p-3 rounded-lg min-w-[200px] group/item hover:bg-purple-300 transition-colors cursor-pointer">
              <div className="flex justify-between items-center">
                <p className="font-bold text-gray-800">Team</p>
                <span className="group-hover/item:translate-x-1 transition-transform text-gray-800">→</span>
              </div>
              <p className="text-sm mt-2 text-gray-700">
                We are proud of our experienced and accomplished team!
              </p>
            </div>
            <div className="bg-violet-200 p-3 rounded-lg min-w-[200px] group/item hover:bg-violet-300 transition-colors cursor-pointer">
              <div className="flex justify-between items-center">
                <p className="font-bold text-gray-800">Career</p>
                <span className="group-hover/item:translate-x-1 transition-transform text-gray-800">→</span>
              </div>
              <p className="text-sm mt-2 text-gray-700">Can you offer such experience?</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Navbar;