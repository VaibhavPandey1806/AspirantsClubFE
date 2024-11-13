// LoginPage.js
import React from 'react';
import './LoginPage.css'; // Optional for custom styling

const LoginPage = () => {
  const handleLogin = () => {
    window.location.href = 'https://aspirantsclub.netlify.app/login';
  };

  return (
    <div className="login-page">
      <h2>Login with Google</h2>
      <button className="google-login-btn" onClick={handleLogin}>
        Login with Google
      </button>
    </div>
  );
};

export default LoginPage;
