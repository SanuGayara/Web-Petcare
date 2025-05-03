import React, { useEffect } from "react"; // Import useEffect
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../components/Navbar";
import "./Home.css";
import petProfileImg from "../assets/pet-profile.jpg";
import vetProfileImg from "../assets/vet-profile.jpg";
import emergencyImg from "../assets/emergency.jpg";
import schelduleImg from "../assets/scheldule.jpg";
import recordsImg from "../assets/records.jpg";
import remindersImg from "../assets/reminders.jpg";

const Home = () => {
  // Initialize AOS animations
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Ensures animation happens only once
    });
  }, []);

  return (
    <>
      <Navbar /> {/* Navbar at the top */}
      <div className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>A Web Health Management System <br /> for optimized <br /> Veterinary-Client Cooperation</h1>
          <p>Track health records, schedule appointments, and manage pet care with ease.</p>
          <a href="/login" className="get-started">Get Started</a>
        </div>
      </div>

      {/* Features Section */}
      <section className="features-sec">
  <h3 data-aos="zoom-in" data-aos-delay="200" data-aos-offset="100">For Veterinarians</h3>
  <div className="feature-box-container">
    {[
      { title: "Pet Profiles", description: "Manage multiple pets.", img: petProfileImg },
      { title: "Vet Profiles", description: "Update vet details.", img: vetProfileImg },
      { title: "Emergency Contacts", description: "Quick access to emergency vets.", img: emergencyImg },
      { title: "Schedule Appointments", description: "Manage appointments.", img: schelduleImg },
      { title: "Digital Health Records", description: "Store health records digitally.", img: recordsImg },
      { title: "Send Reminders", description: "Never miss an appointment.", img: remindersImg }
    ].map((feature, index) => (
      <div key={index} className="feature-box" data-aos="fade-up">
        <img src={feature.img} alt={feature.title} />
        <div className="feature-content">
          <h4>{feature.title}</h4>
          <p>{feature.description}</p>
        </div>
      </div>
    ))}
  </div>
</section>


    </>
  );
};

export default Home;
