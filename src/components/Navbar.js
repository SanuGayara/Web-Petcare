import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="/" className="logo">PET'S LIFE</a>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
            
          <li><a href="patientrecords">PatientRecords</a></li>
          <li><a href="appointments">Appointments</a></li> 
          <li><a href="emergency">Emergency</a></li>
          <li><a href="about">About</a></li>
          <li><a href="/login" className="login-btn">Login</a></li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

