import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Phone, Building2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import weblogo from '../assets/weblogo.webp';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    // Force white navbar on non-home pages
    if (!isHome) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const navLinks = [
    { label: 'Home', to: '/', icon: <Home size={18} /> },
    { label: 'All Projects', to: '/view-all-projects', icon: <Building2 size={18} /> },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img className="h-8 w-auto" src={weblogo} alt="Propques" />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden sm:flex space-x-6 items-center">
            {navLinks.map(({ label, to }) => {
              const isActive = location.pathname === to;
              // On home page and not scrolled, use white text; otherwise use gray/dark text
              const linkClass = isActive
                ? 'text-[#20B1EE] border-[#20B1EE]'
                : isHome && !isScrolled
                ? 'text-white border-transparent hover:text-gray-300 hover:border-gray-300'
                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300';
              return (
                <Link
                  key={label}
                  to={to}
                  className={`text-sm font-medium inline-flex items-center px-2 pt-1 border-b-2 transition-all duration-150 ${linkClass}`}
                >
                  {label}
                </Link>
              );
            })}

            {/* Contact Button */}
            <div className="inline-flex items-center text-sm bg-[#20B1EE] text-white hover:scale-105 transition-all ease-in-out border rounded-full py-2 px-4 gap-2">
              <Phone size={16} />
              +91 73920 37856
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden">
            <button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors duration-150 ${
                isHome && !isScrolled
                  ? 'text-white hover:text-gray-300'
                  : 'text-gray-600 hover:text-gray-800'
              } hover:bg-gray-100`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden bg-white border-t px-4 py-3 space-y-2">
          {navLinks.map(({ label, to, icon }) => (
            <Link
              key={label}
              to={to}
              onClick={closeMenu}
              className={`flex items-center gap-2 py-2 px-3 rounded-md text-sm font-medium ${
                location.pathname === to
                  ? 'bg-blue-50 text-[#20B1EE]'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {icon}
              {label}
            </Link>
          ))}

          <div className="flex items-center gap-2 text-sm text-gray-700 px-3">
            <Phone size={16} />
            +91 73920 37856
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
