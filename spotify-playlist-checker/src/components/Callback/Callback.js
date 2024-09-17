import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Height } from '@mui/icons-material';
import { Box } from '@mui/system';
import Footer from '../../sections/Footer';
import { Typography } from '@mui/material';

const Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const exchangeCodeForTokens = async () => {
            const query = new URLSearchParams(window.location.search);
            const authorizationCode = query.get('code');

            if (authorizationCode) {
                try {
                    const response = await axios.get(`http://localhost:3001/api/callback?code=${authorizationCode}`);
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
        <>
            <Box sx={{
                display:'flex',
                height:'100%',
                backgroundColor: "#67c789",
                alignItems:'center',
                justifyContent:'space-between',
                flexDirection:'column',
                
            }}>
                <Typography variant='h3' sx={{color:'white', pt:'20%'}}>Processing authentication...</Typography>
                <Box sx={{width:'100%'}}>
                    <Footer />
                </Box>
               
            </Box>
            
        </>
    );
};

export default Callback;