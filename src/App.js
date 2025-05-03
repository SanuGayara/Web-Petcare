import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import PatientRecords from "./pages/PatientRecords";
import Appointments from "./pages/Appointments";
import Emergency from "./pages/Emergency";
import AOS from "aos";
import "aos/dist/aos.css";
import VetProfile from "./pages/VetProfile"; // Import AOS styles

function App() {
  // Initialize AOS (Animate On Scroll) library
  useEffect(() => {
    AOS.init({
      duration: 800, // Animation duration
      easing: "ease-in-out", // Easing type
      once: true, // Whether animation should happen only once
      mirror: false, // Whether elements should animate out while scrolling past them
    });
  }, []);

  return (
    <Router>
      <Navbar />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/About" element={<About />} />
          <Route path="/PatientRecords" element={<PatientRecords />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/vet-profile" element={<VetProfile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
