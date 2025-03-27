import React, { useState } from 'react';
import { Menu, X, Home, Phone, Building2, Info } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import weblogo from '../assets/weblogo.webp';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false); // closes menu on link click

  const navLinks = [
    { label: 'Home', to: '/', icon: <Home size={18} /> },
    { label: 'Commercial Office Leasing & Sales', to: '/commercial-propert-leasing-and-sale', icon: <Building2 size={18} /> },
    { label: 'Contact', to: '/contact', icon: <Phone size={18} /> },
    { label: 'About Us', to: '/about', icon: <Info size={18} /> },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img className="h-8 w-auto" src={weblogo} alt="Propques" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:space-x-6">
            {navLinks.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className={`text-sm font-medium inline-flex items-center px-2 pt-1 border-b-2 ${
                  location.pathname === to
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="sm:hidden px-4 pb-3">
          {navLinks.map(({ label, to, icon }) => (
            <Link
              key={label}
              to={to}
              onClick={closeMenu}
              className={`flex items-center gap-2 py-2 px-3 rounded-md text-sm font-medium ${
                location.pathname === to
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {icon}
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
