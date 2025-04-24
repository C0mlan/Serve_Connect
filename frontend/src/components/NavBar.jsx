import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ACCESS_TOKEN, USER } from "../helpers/constants";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
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

  return (
    <nav>
      <Link to="/register">Register</Link>
      <Link to="/verify">Verify</Link>
      <Link to="/update-profile">Update</Link>
      <Link to="/listings">Listings</Link>
      <Link to="/create-listing">Create Listing</Link>

      {isAuthenticated && <button onClick={handleLogout}>Logout</button>}

      {!isAuthenticated && <Link to="/login">Login</Link>}
      {user.username && (
        <p>
          {user.username} {user.accountType}{" "}
        </p>
      )}
    </nav>
  );
};

export default NavBar;
