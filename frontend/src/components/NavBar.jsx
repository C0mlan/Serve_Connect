import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ACCESS_TOKEN, USER } from "../helpers/constants";

const NavBar = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useAuth();

  const handleLogout = () => {
    if (confirm("Are you sure?")) {
      setIsAuthenticated(false);
      setUser({
        isEmailVerified: false,
        isProfileUpdated: false,
      });
      localStorage.removeItem(USER);
      localStorage.removeItem(ACCESS_TOKEN);
    }
  };

  return (
    <nav>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <Link to="/verify">Verify</Link>
      <Link to="/update-profile">Update</Link>
      <Link to="/listings">Listings</Link>

      {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
};

export default NavBar;
