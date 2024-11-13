import React, { useState, useEffect } from 'react';
import './Header1.css';
import { BASE_URL } from './constants';

const Header = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Fetch user data from your backend
    const fetchUserData = async () => {
      try {
        const response = await fetch(BASE_URL + '/userDetails', {
          credentials: 'include', // Include credentials for CORS
        });
        if (response.ok) {
          const data = await response.json();
          if (data && data.name) {
            setUser(data.name);
          }
        } else {
          // User not authenticated, handle accordingly
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'GET',
        credentials: 'include', // Include credentials for CORS
      });
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <header className="header1">
      <h1 className="club-title1">Aspirants Club</h1>
      <div className="sub-title2">Your study buddy for success!</div>
      <div className="nav-links1">
        {user ? (
          <div
            className="user-dropdown"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <span className="welcome-message">Welcome, {user}!</span>
            {showDropdown && (
              <div className="dropdown-menu">
                <a href="/responses" className="dropdown-item">Responses</a>
                <a href="#logout" onClick={handleLogout} className="dropdown-item">Logout</a>
              </div>
            )}
          </div>
        ) : (
          <a href="/login">Login / Sign Up</a>
        )}
      </div>
      <div className="header-line"></div>
    </header>
  );
};

export default Header;
