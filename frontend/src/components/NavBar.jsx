import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ACCESS_TOKEN, USER } from "../helpers/constants";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const { isAuthenticated, setIsAuthenticated, setUser, user } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    if (confirm("Are you sure?")) {
      setIsAuthenticated(false);
      setUser({
        isEmailVerified: false,
        isProfileUpdated: false,
      });
      localStorage.removeItem(USER);
      localStorage.removeItem(ACCESS_TOKEN);
      navigate("/login");
    }
  };
  // console.log(user.basedOn);

  const handleAccountTypeDisplay = () => {
    if (user.accountType === "volunteer") {
      return "Volunteer";
    } else {
      return `Volunteer Seeker - ${user.accountType.toUpperCase()}`;
    }
  };

  const handleCloseMobileNav = () => {
    setIsMobileNavOpen(false);
    setIsOpen(false);
  };
  const handleProfileMenuOpen = () => {
    if (isMobileNavOpen) {
      setIsMobileNavOpen(false);
      setIsOpen(true);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <nav className=" relative flex items-center bg-white justify-between">
        {/* Navigation Links - Right Side - Hamburger menu for mobile */}
        <div className="hidden md:flex items-center text-xl">
          <Link
            to="/"
            onClick={handleCloseMobileNav}
            className=" hover:bg-gray-100 px-3 py-2 font-medium rounded-md"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={handleCloseMobileNav}
            className=" hover:bg-gray-100 px-3 py-2 font-medium rounded-md"
          >
            About
          </Link>
          <Link
            to="/listings"
            onClick={handleCloseMobileNav}
            className=" hover:bg-gray-100 px-3 py-2 font-medium rounded-md"
          >
            Listings
          </Link>
          <Link
            to="/contact"
            onClick={handleCloseMobileNav}
            className=" hover:bg-gray-100 px-3 py-2 font-medium rounded-md"
          >
            Contact
          </Link>
          {!isAuthenticated && (
            <Link to="/login" className="ml-3">
              <Button text="Login" />
            </Link>
          )}
          {isAuthenticated && user.accountType !== "volunteer" && (
            <Link
              to="/create-listing"
              onClick={handleCloseMobileNav}
              className=" hover:bg-gray-100 px-3 py-2 font-medium rounded-md"
            >
              Create Listing
            </Link>
          )}
        </div>

        {/* Mobile Menu Button (hidden on desktop) */}
        <button
          className="md:hidden bg-gray-500 cursor-pointer text-white p-2 rounded-sm ml-3"
          onClick={() => {
            setIsMobileNavOpen(!isMobileNavOpen);
            setIsOpen(false);
          }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {isAuthenticated && user && (
          <div
            className="relative inline-block text-left ml-3"
            onClick={handleProfileMenuOpen}
          >
            <div className="rounded-full justify-center bg-white px-3 h-12 flex items-center w-12 py-3 text-xl shadow-lg font-semibold ring-2 ring-gray-300 hover:bg-gray-50 cursor-pointer">
              Me
            </div>
            <div>
              {isOpen && (
                <div className="absolute right-0 top-16 z-10 w-72 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden">
                  <div className="py-1">
                    {user.username && (
                      <p className="block px-4 py-2 text-sm text-gray-700">
                        You are logged in as <b>{user.username} (</b>
                        {handleAccountTypeDisplay()})
                      </p>
                    )}
                    {user.accountType !== "volunteer" && (
                      <Link
                        className=" hover:bg-gray-100 block w-full px-4 py-2 text-left text-sm text-gray-700"
                        to="/listings/me"
                      >
                        My Listings
                      </Link>
                    )}
                    {user.accountType == "volunteer" && (
                      <Link
                        className=" hover:bg-gray-100 hover:text-gray-900 block w-full px-4 py-2 text-left text-sm text-gray-700"
                        to="/connections"
                      >
                        My Connection Requests
                      </Link>
                    )}
                    <button
                      className="cursor-pointer hover:bg-gray-100 block w-full px-4 py-2 text-left text-sm text-gray-700"
                      onClick={handleLogout}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
      {isMobileNavOpen && (
        <div className="absolute top-28 z-10 right-0 text-bold bg-white mx-8 min-w-sm">
          <div className="text-bold hover:shadow-lg">
            <Link
              to="/"
              onClick={handleCloseMobileNav}
              className=" hover:bg-gray-100 border-b border-gray-200  px-6 py-5 font-medium w-full block"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={handleCloseMobileNav}
              className=" hover:bg-gray-100 border-b border-gray-200 px-6 py-5 font-medium w-full block"
            >
              About
            </Link>
            <Link
              to="/listings"
              onClick={handleCloseMobileNav}
              className=" hover:bg-gray-100 border-b border-gray-200 px-6 py-5 font-medium w-full block"
            >
              Listings
            </Link>
            <Link
              to="/contact"
              onClick={handleCloseMobileNav}
              className=" hover:bg-gray-100 border-b border-gray-200 px-6 py-5 font-medium w-full block"
            >
              Contact
            </Link>
            {!isAuthenticated && (
              <Link
                to="/login"
                onClick={handleCloseMobileNav}
                className=" hover:bg-gray-100 border-b border-gray-200 px-6 py-1 font-medium w-full block"
              >
                <Button text="Login" />
              </Link>
            )}
            {isAuthenticated && user.accountType !== "volunteer" && (
              <Link
                to="/create-listing"
                onClick={handleCloseMobileNav}
                className=" hover:bg-gray-100 border-b border-gray-200 px-6 py-5 font-medium w-full block"
              >
                Create Listing
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
