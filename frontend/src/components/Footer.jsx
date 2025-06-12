import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="text-gray-700 py-8 md:py-12 mx-4 md:mx-12">
      {/* Footer Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Copyright Section */}
        <div className="flex flex-col items-center md:items-start">
          <img src={logo} alt="logo" className="w-20 h-20 mb-4 rounded-lg" />
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} ServeConnect.
            <br />
            All rights reserved.
          </p>
        </div>

        {/* Resources Column */}
        <div>
          <h3 className="font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/listings" className="hover:text-black">
                Browse Opportunities
              </Link>
            </li>
            <li>
              <Link to="/volunteer-feedback" className="hover:text-black">
                Volunteer Stories
              </Link>
            </li>

            <li>
              <Link to="/donate" className="hover:text-black">
                Donate
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect Column */}
        <div>
          <h3 className="font-bold text-lg mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/faqs" className="hover:text-black">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-black">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-black">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
