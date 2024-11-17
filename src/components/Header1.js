import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header1.css';
import { BASE_URL } from './constants';
import axios from 'axios';
axios.defaults.withCredentials = true;

const Header1 = () => {
    const [username, setUsername] = useState('');

    // Fetch the username from the API
    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/userDetails`);
                setUsername(response.data.username || 'User');
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        };

        fetchUsername();
    }, []);

    return (
        <header className="header">
            <div className="header-left">
                <h1>Aspirants Club</h1>
            </div>
            <div className="header-right">
                <nav>
                    <Link to="/submit-question" className="nav-link">Submit Question</Link>
                    <Link to="/categories" className="nav-link">Access Question Banks</Link>
                    <Link to="/about-us" className="nav-link">About Us</Link>
                </nav>
                <div className="auth-links">
                    <div className="dropdown">
                        <span className="username">{username} ▼</span>
                        <div className="dropdown-menu">
                            <Link to="/your-profile" className="dropdown-item">Your Profile</Link>
                            <Link to="/responses" className="dropdown-item">Your Responses</Link>
                            <Link to="/logout" className="dropdown-item">Logout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header1;
