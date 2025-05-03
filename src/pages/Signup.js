import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Signup.css';


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Account created successfully!");
    navigate("/login");
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-left">
          <h2>Sign Up</h2>
            
          
        </div>
        <div className="signup-right">
         

          <form onSubmit={handleSignup} className="signup-form">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          
            <input type="text" placeholder="Clinic Name" required />
            <input type="text" placeholder="Clinic Address" required />
            <input type="text" placeholder="Professional License Number" required />
            <input type="number" placeholder="Years of Experience" required />
            <input type="text" placeholder="Specialization (e.g. Surgery, Dermatology)" required />
            <input type="text" placeholder="Clinic Operating Hours (e.g. Mon-Fri, 9 AM - 6 PM)" required />
          
           

            <input type="url" placeholder="Website / Social Media Links (Optional)" />
            <input type="file" className="file-upload" />
            <button type="submit" className="signup-btn">Sign Up</button>
         </form>

          <div className="signup-footer">
            <p>Already have an account? <a href="/login">Log In</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
