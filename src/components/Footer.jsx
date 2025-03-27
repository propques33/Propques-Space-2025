import React from 'react';
import { Linkedin, Instagram, Facebook } from 'lucide-react';
import weblogo from '../assets/image.png';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-500 to-blue-600 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Column 1 - Branding */}
        <div className="md:col-span-1">
          <h3 className="text-lg font-semibold mb-2">Let’s stay in touch!</h3>
          <p className="text-sm mb-6">We’ll send you a nice letter once per week. No spam.</p>
          <img src={weblogo} alt="Propques" className="h-12 mb-4" />
          <p className="text-sm">
            Helping property owners, entrepreneurs, and real estate professionals transform and
            matchmake spaces into profitable coworking business.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>Looking for Offices</li>
            <li>Our Service</li>
            <li>Webinar</li>
            <li>Our Partners</li>
          </ul>
        </div>

        {/* Column 3 - Menu */}
        <div>
          <h4 className="font-semibold mb-4">Menu</h4>
          <ul className="space-y-2 text-sm">
            <li>Blog</li>
            <li>Careers</li>
            <li>Contact</li>
            <li>About</li>
          </ul>
        </div>

        {/* Column 4 - Products */}
        <div>
          <h4 className="font-semibold mb-4">Our Products</h4>
          <ul className="space-y-2 text-sm">
            <li>Findurspace</li>
            <li>Propclean</li>
          </ul>
        </div>

        {/* Column 5 - Newsletter + Social */}
        <div>
          
          <h4 className="font-semibold mb-2">Follow Us</h4>
          <div className="flex space-x-4">
            <Linkedin className="w-5 h-5" />
            <Instagram className="w-5 h-5" />
            <Facebook className="w-5 h-5" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
