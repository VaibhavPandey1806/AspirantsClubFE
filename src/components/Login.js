// Login.js
import React, { useState } from 'react';
import axios from 'axios';
// import './Login.css';
import { BASE_URL } from './constants';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('https://aspirantsclub-production.up.railway.app/public/login', { username, password });
            
            // Assuming the response has a token, you can store it
            //  const token = response.data.token;
            //  localStorage.setItem('token', token);

            // Redirect user or update state based on login success
            alert('Login successful!');
            window.location.href = '/';
        } catch (error) {
            setError("Invalid username or password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="login-form">
                <div className="input-group">
                    <label>Username</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit" className="login-button" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;
