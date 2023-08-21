import React from 'react';
import './About.css'; // Import your CSS file for styling
import Header from '../../Header/Header';

const About= () => {
  return (
    <div className="about-container">
        <Header/>
      <div className="about-content">
        <h2 className="about-heading">About Us</h2>
        <div className="about-image">
          <img src= "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d3JpdGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="Profile" />
        </div>
        <p className="about-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in quam eget odio auctor dictum.
          Sed sit amet lectus nec ex lacinia posuere vitae quis lorem. Sed non semper tellus.
        </p>
      </div>
    </div>
  );
};

export default About;
