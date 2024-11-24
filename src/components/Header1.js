import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header1.css';
import { BASE_URL, BASE_URL1, LOGOUT_URL } from './constants'; // Ensure LOGOUT_URL is defined in constants
import axios from 'axios';

axios.defaults.withCredentials = true;

const Header1 = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    // Fetch login status and username
    useEffect(() => {
        const fetchLoginStatus = async () => {
            try {
                const loginResponse = await axios.get(`${BASE_URL1}/isLogin`);
                setIsLoggedIn(loginResponse.data === true ? true : false);

                if (loginResponse.data) {
                    const userResponse = await axios.get(`${BASE_URL}/userDetails`);
                    setUsername(userResponse.data.username || 'User');
                }
            } catch (error) {
                console.error('Error checking login status:', error);
                setIsLoggedIn(false);
            }
        };

        fetchLoginStatus();
    }, []);

    // Handle logout
    const handleLogout = () => {
        window.location.href = LOGOUT_URL; // Redirects to the logout URL
    };

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
                    {isLoggedIn ? (
                        <div className="dropdown">
                            <span className="username">{username} ▼</span>
                            <div className="dropdown-menu">
                                <Link to="/profile" className="dropdown-item">Your Profile</Link>
                                <Link to="/responses" className="dropdown-item">Your Responses</Link>
                                <button className="dropdown-item" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/register" className="nav-link">Login/Signup</Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header1;
