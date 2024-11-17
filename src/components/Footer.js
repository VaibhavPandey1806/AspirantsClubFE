// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <nav>
                <Link to="/submit-question" className="nav-link">Submit Question</Link>
                <Link to="/access-question-banks" className="nav-link">Access Question Banks</Link>
                <Link to="/about-us" className="nav-link">About Us</Link>
            </nav>
            <p className="footer-text">© 2024 Aspirants Club. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
