// OAuthCallback.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Assuming the backend sends the token in the response after successful login
        const fetchAccessToken = async () => {
            try {
                // You may need to change the endpoint according to your backend setup
                const response = await fetch('https://aspirantsclub.netlify.app/oauth2/callback', {
                    method: 'GET',
                    credentials: 'include', // This allows cookies and HTTP Auth information to be included
                });

                if (response.ok) {
                    const data = await response.json();
                    const { access_token } = data; // Adjust based on how your backend sends the token

                    // Store the token in localStorage or sessionStorage
                    localStorage.setItem('access_token', access_token);

                    // Redirect to the desired page after login
                    navigate('/'); // Or wherever you want to redirect
                } else {
                    console.error('Error retrieving access token');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchAccessToken();
    }, [navigate]);

    return <div>Loading...</div>; // Loading state while fetching the token
};

export default OAuthCallback;
