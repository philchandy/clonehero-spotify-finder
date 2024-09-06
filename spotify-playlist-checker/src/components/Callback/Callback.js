import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const exchangeCodeForTokens = async () => {
            const query = new URLSearchParams(window.location.search);
            const authorizationCode = query.get('code');

            if (authorizationCode) {
                try {
                    const response = await axios.get(`http://localhost:3001/callback?code=${authorizationCode}`);
                    const { access_token, refresh_token } = response.data;

                    // Store tokens in local storage
                    localStorage.setItem('spotify_token', access_token);
                    localStorage.setItem('spotify_refresh_token', refresh_token);

                    // Redirect to /playlist route after successful authentication
                    navigate('/playlist');
                } catch (error) {
                    console.error('Error exchanging code for tokens:', error);
                    
                }
            } else {
                console.error('Authorization code not found.');
                
            }
        };

        exchangeCodeForTokens();
    }, [navigate]);

    return (
        <div>
            <h2>Processing authentication...</h2>
        </div>
    );
};

export default Callback;