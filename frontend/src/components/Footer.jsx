import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="text-gray-700 py-8 md:py-12 mx-4 md:mx-8">
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
              <a
                href="#"
                className="hover:text-black hover:font-semibold transition"
              >
                Browse Opportunities
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-black hover:font-semibold transition"
              >
                Volunteer Stories
              </a>
            </li>

            <li>
              <a
                href="#"
                className="hover:text-black hover:font-semibold transition"
              >
                Donate
              </a>
            </li>
          </ul>
        </div>

        {/* Connect Column */}
        <div>
          <h3 className="font-bold text-lg mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="hover:text-black hover:font-semibold transition"
              >
                FAQs
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-black hover:font-semibold transition"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-black hover:font-semibold transition"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
