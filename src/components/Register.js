import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';
import { BASE_URL } from './constants';
const Register = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    // Fetch email on component mount
    useEffect(() => {
        const fetchEmail = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/getEmail`, {
                    withCredentials: true,  // Include credentials (cookies, etc.)
                });

                if (response.data) {
                    setEmail(response.data); // Set email from API response
                } else {
                    navigate('/login'); // Navigate to login if email is not found
                }
            } catch (error) {
                console.error('Error fetching email:', error);
                navigate('/login'); // Navigate to login or another page on error
            }
        };

        fetchEmail();
    }, [navigate]);

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Construct query parameters from user data
        const queryParams = new URLSearchParams({
            name,
            username,
            password,
            mobile,
            email
        }).toString();

        try {
            // Send GET request with query parameters
            const response = await axios.get(`${BASE_URL}/addUserfromWeb?${queryParams}`, {
                withCredentials: true,  // Include credentials (cookies, etc.)
            });

            if (response.data.id) {
                navigate('/'); // After successful registration, navigate to home
            } else {
                alert('Failed to create user');
            }
        } catch (error) {
            console.error('Error during user creation:', error);
            alert('An error occurred while registering the user.');
        }
    };

    return (
        <div className="register-container">
            <h2>Complete Your Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label>Mobile</label>
                    <input
                        type="text"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        readOnly
                        className="input-field"
                    />
                </div>
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
};

export default Register;
