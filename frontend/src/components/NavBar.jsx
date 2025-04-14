import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <Link to="/register">Register</Link>
      <Link to="/verify">Verify</Link>
      <Link to="/update-profile">Update</Link>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  );
};

export default NavBar;
