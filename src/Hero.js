import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero">
      <h2 className="hero-text">
        Your One-Stop Destination for Mastering Competitive Exams—Free
        Resources, Peer Support, and Tools to Help You Succeed
      </h2>
      <div className="hero-buttons">
        <button className="btn">Submit Your Question</button>
        <button className="btn">Get Started</button>
      </div>
    </div>
  );
};

export default Hero;
