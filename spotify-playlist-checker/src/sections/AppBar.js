import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import Box from '@mui/material/Box';
import logoWhite from '../assets/logoWhite.png'

import './sections.css'; // Import the CSS file

const AppBarComponent = () => {
    const [ user, setUser ] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {

            const accessToken = localStorage.getItem('spotify_token');
        
            try {
                const response = await axios.get('https://api.spotify.com/v1/me', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                return setUser(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                return null;
            }
        };

        fetchUserProfile();
    }, []);

    const profilePictureUrl = user?.images?.[0]?.url
    const userName = user?.display_name

    return (
        <AppBar position="static" className="app-bar" sx={{ backgroundColor:"#222222", zIndex:'1000' }}>
            <Toolbar className="toolbar">
                <Box sx={{ display: 'flex', justifyContent: 'start'}}>
                    <img
                        src={logoWhite}
                        alt="Clone Hero Sync Logo"
                        style={{ width: '60%' }}
                    />
                </Box>

                {/* User info on the right side, only visible when isMobile is false */}
                <Box className="user-info" sx={{  }}>
                    <Typography className="username" sx={{ mr:2, }}>{userName}</Typography>
                    <Box>
                        <Avatar alt={userName} src={profilePictureUrl} />
                    </Box>
                </Box>
                
            </Toolbar>
        </AppBar>
    );
};

export default AppBarComponent;