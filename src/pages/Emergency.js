import React from 'react';
import './Emergency.css';

const EmergencyContact = () => {
  return (
    <div className="emergency-contact-container">
      <h1 className="emergency-title">Emergency Contact</h1>

      <div className="contact-section">
        <h2>Clinic Emergency Line</h2>
        <p><a href="tel:+1234567890">+94 (234) 567-890</a></p>
      </div>

      <div className="contact-section">
        <h2>After-Hours Support</h2>
        <p><a href="tel:+1987654321">+94 (741) 434-477</a></p>
      </div>

      <div className="contact-section">
        <h2>Our Location</h2>
        <p>No.559/8, Galle Road, Panadura.</p>
        <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
          View on Google Maps
        </a>
        {/* Map Embed */}
        <div className="map-container">
          <iframe
            title="clinic-location-map"
            src="https://www.google.com/maps/place/Pet+and+Paws+Animal+Clinic/@6.7073297,79.9074505,18z/data=!3m1!4b1!4m6!3m5!1s0x3ae24782c9b14115:0x251abb21fa485f05!8m2!3d6.7073278!4d79.9083497!16s%2Fg%2F11j_7v8195?entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoASAFQAw%3D%3D"
            height="300"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="advice-section">
        <h2>What to Do in an Emergency</h2>
        <p>Stay calm, keep your pet warm and safe, and call us immediately. If we are unavailable, proceed to the nearest 24-hour animal hospital.</p>
      </div>
    </div>
  );
};

export default EmergencyContact;
