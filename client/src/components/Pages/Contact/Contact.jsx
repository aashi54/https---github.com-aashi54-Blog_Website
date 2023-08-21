import React from 'react';
import './Contact.css'; 
import Header from '../../Header/Header';

const Contact = () => {
  return (
    <div className="contact-container">
        <Header/>
    <h2 className="contact-heading">Get in Touch</h2>
    <p className="contact-description">We'd love to hear from you! Feel free to drop us a message.</p>
    <form className="contact-form">
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" placeholder='Enter your name' className="contact-input" required />

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" placeholder='Enter your email' className="contact-input" required />

      <label htmlFor="message">Message:</label>
      <textarea id="message" name="message" placeholder='Write your Message' className="contact-textarea" rows="5" required />

      <button type="submit" className="contact-submit-button">Send Message</button>
    </form>
  </div>
  );
};

export default Contact;
