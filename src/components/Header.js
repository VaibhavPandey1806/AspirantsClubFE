// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-left">
                <h1>Aspirants Club</h1>
            </div>
            <div className="header-right">
                <nav>
                    <Link to="/submit-question" className="nav-link">Submit Question</Link>
                    <Link to="/access-question-banks" className="nav-link">Access Question Banks</Link>
                    <Link to="/about-us" className="nav-link">About Us</Link>
                </nav>
                <div className="auth-links">
                    <Link to="/login" className="login-link">Login/Signup</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
