import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about section">
      <div className="container">
        <span className="section-label fade-in">ABOUT US</span>
        <h2 className="section-title fade-in animate-delay-1">About Us</h2>
        <p className="about-description center-text fade-in animate-delay-2">
          Hello and Welcome to MindSpa!<br />
          We are a team of psychologists and our goal is to partner with you to enhance the quality of your life. 
          Whether you are dealing with something specific or are seeking increased satisfaction and balance in life, we're here to help.
        </p>
        <div className="about-actions fade-in animate-delay-3">
          <button 
            className="btn btn-outline"
            onClick={() => {
              const element = document.querySelector('#founder');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Know More
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Book Appointment
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;

