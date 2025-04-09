import { Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-50 text-black px-6 py-10 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        {/* Logo and Certifications */}
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <span className="font-bld text-4xl">Propques Spaces</span>
            {/* <span className="text-sm">Corporation</span>
            <span className="text-sm">2024 Property Week</span>
            <span className="text-xs">Awards Finalist</span> */}
          </div>
        </div>

        {/* Column 1 */}
        <div className="space-y-2">
          <div className="font-semibold">Landlords</div>
          <div>Locations</div>
          <div>Our Stories</div>
          <div>Newsletter</div>
          <div>Industry Insights Report</div>
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
          <div>
            <div className="font-semibold">COWORKING</div>
            <div>Hot Desking</div>
            <div>Dedicated Desk</div>
          </div>
          <div>
            <div className="font-semibold">PRIVATE OFFICE</div>
            <div>Private Office</div>
            <div>Enterprise Suites</div>
          </div>
        </div>

        {/* Column 3 */}
        <div className="space-y-2">
          <div className="font-semibold">FOR THE DAY</div>
          <div>Day Pass</div>
          <div>Private Office Day Pass</div>
          <div>Meeting Rooms</div>
        </div>

        {/* Column 4 */}
        <div className="space-y-2">
          <div className="font-semibold">Members Portal</div>
          <div>Contact Us</div>
          <div>About Us</div>
          <div>Careers</div>
          <div>FAQs</div>
          <div>Referrals</div>
          <div className="mt-4 font-semibold">FOLLOW US</div>
          <div className="flex space-x-4">
            
            <a href="https://www.instagram.com/propques_services/?hl=en"><Instagram className="w-5 h-5" /></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 text-center border-t border-yellow-100 pt-4">
        <div className="flex flex-col md:flex-row justify-between text-xs max-w-7xl mx-auto px-4">
          <span>Cookie Policy</span>
          <span>Copyright © 2025 Propques Service Pvt. Ltd. All rights reserved</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
}
