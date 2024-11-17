import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RedirectPage = () => {
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        const checkUserExistence = async () => {
            try {
                // Make an API call to check if the user exists
                const response = await axios.get('http://localhost:8081/api/isUser', {
                    withCredentials: true, // Include credentials (cookies, etc.)
                });

                console.log('API Response:', response.data); // Log the response to inspect

                // If response.data is exactly true, navigate to home
                if (response.data.isUser) {
                    navigate('/');                } 
                // If response.data is falsy (false, null, undefined, etc.), navigate to register
                else {
                    navigate('/register');
                }
            } catch (error) {
                console.error('Error checking user existence:', error);
                // Optionally navigate to an error page or login page
                navigate('/login');
            }
        };

        // Call the checkUserExistence function
        checkUserExistence();
    }, [navigate]);

    return (
        <div>
            <h2>Loading...</h2>
        </div>
    );
};

export default RedirectPage;
