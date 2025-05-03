import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

import illustration from "../assets/pet-logo.png";
import {toast, ToastContainer} from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (email && password) {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.status === 200) {
          // Store token + user
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          toast.success("Login Successfully");
          navigate('/');
        } else {
          toast.error(data.message);
        }
      } else {
        toast.error("Please fill all the fields");
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to check email and password");
    }
  };

  return (
    <div className="login-container">
      <ToastContainer/>
      <div className="login-left">
        <img src={illustration} alt="Pet Care Illustration" className="login-illustration" />
        <p className="tip">Tip for veterinarians</p>
        <p className="tip-text">Now it’s easier to track your pet’s health <br/>and  <br/>upcoming appointments with our new dashboard view!</p>
      </div>
      
      <div className="login-right">
        <div className="login-card">
          
          <h2>Welcome to PetLife!</h2>
          <p className="subtitle">The all-in-one pet care system!</p>

          <form onSubmit={handleLogin} className="login-form">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
            <button type="submit" className="login-btn">Login</button>

          </form>

          <p>
          Don’t have an account? <a href="/Signup">Sign Up</a>
        </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
