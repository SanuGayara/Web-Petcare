import React from "react";
import { motion } from "framer-motion";
import "./About.css";

const About = () => {
  return (
    <motion.div
      className="about-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Introduction */}
      <motion.div
        className="intro"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>Welcome to PetLife</h1>
        <p>The all-in-one digital solution for veterinary clinics.<br/> Our platform is designed to help veterinarians 
          manage patient records, appointments, and emergency alerts efficiently.<br/> We believe in using technology 
          to simplify veterinary care, so vets can focus on what matters most—providing the best care for animals.</p>
      </motion.div>

      {/* Mission & Vision */}
      <div className="mission-vision">
        <motion.div
          className="mission"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h2>Our Mission</h2>
          <p>Our mission is to empower veterinary professionals with innovative tools that improve efficiency, 
          enhance pet care, and streamline clinic management.</p>
        </motion.div>

        <motion.div
          className="vision"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h2>Our Vision</h2>
          <p> We envision a world where every veterinary clinic can leverage technology to provide seamless 
          and superior healthcare for pets.</p>
        </motion.div>
      </div>

      {/* Key Features */}
      <motion.div
        className="features"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        <h2>Key Features</h2>
        <ul>
          {[
            "📌 Digital Health Records",
            "📌 Appointment Scheduling",
            "📌 Automated Reminders",
            "📌 Emergency Alerts",
            "📌 Vet Profiles & Secure Login",
          ].map((feature, index) => (
            <motion.li key={index} whileHover={{ scale: 1.1 }}>
              {feature}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Why Choose Us */}
      <motion.div
        className="why-choose"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <h2>Why Choose Us?</h2>
        <div className="choose-cards">
          {[
            { title: "User-Friendly Interface", text: "Simple and easy to use for veterinarians." },
            { title: "Secure & Reliable", text: "Advanced security to protect pet records." },
            { title: "24/7 Accessibility", text: "Access clinic data anytime, anywhere." },
            { title: "Dedicated Support", text: "We are here to assist you at every step." },
          ].map((card, index) => (
            <motion.div
              key={index}
              className="card"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px #e27f83(0, 0, 0, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
