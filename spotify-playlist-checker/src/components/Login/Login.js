import React from 'react';
import { Button, Typography, Paper, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../../sections/Footer';
import {ReactComponent as SpotifyIcon} from '../../assets/spotify.svg'
import InfoSection from '../../sections/InfoSection';
import Circles from '../../sections/Circles'
import apiBaseUrl from '../ApiConfig';
import Logo from '../../assets/logoBlack.png'

const Login = () => {
    const handleLogin = () => {
        window.location.href = `${apiBaseUrl}/api/login`;
    }

    const theme = createTheme({
        typography: {
          h3: {
            fontSize: 40,
            fontWeight:700,
            fontFamily:"sans-serif",
            marginBlockStart:"0.67em",
            marginBlockEnd:"0.67em",
          },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Circles />
            <Box sx={{ zIndex: "1", position: 'relative' }}>
                <Box sx={{
                    display: 'flex',
                    minHeight: '100vh',
                    paddingLeft: { md: '3%', sm: '0%' },
                    alignItems: { md: 'flex-start', sm: 'center' },
                    justifyContent: 'center',
                    flexDirection: 'column',
                    width: '100%',
                }}>
                    {/* Show Paper on medium and larger devices */}
                    <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                        <Paper
                            elevation={4}
                            sx={{
                                padding: '5%',
                                flexDirection: 'column',
                                width: { xs: '90%', sm: '100%', md: '700px' },
                                borderRadius: '30px',
                                backgroundColor: '#f0f0f0',
                                textAlign: 'start',  // Center content inside Paper
                            }}
                        >
                            {/* Logo Section */}
                            <Box sx={{ display: 'flex', justifyContent: 'start', marginBottom: '2rem' }}>
                                <img
                                    src={Logo}
                                    alt="Clone Hero Sync Logo"
                                    style={{ width: '60%', maxWidth: '400px', borderRadius: '10px' }}
                                />
                            </Box>

                            {/* Text Content */}
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 600,
                                    marginBottom: '1.5rem',
                                    fontFamily: 'Poppins, sans-serif',
                                    color: '#333',
                                }}
                            >
                                Check Your Favorite Playlists on Clone Hero
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    marginBottom: '2.5rem',
                                    color: '#666',
                                    fontFamily: 'Poppins, sans-serif',
                                    lineHeight: 1.6,
                                }}
                            >
                                Explore your Spotify playlists and check for compatability with Clone Hero effortlessly. Search, select, and enjoy your favorite tracks in the game.
                            </Typography>

                            {/* Spotify Button */}
                            <Button
                                onClick={handleLogin}
                                sx={{
                                    border: "2px solid #3e3e3e",
                                    borderColor:'d3d3d3',
                                    borderRadius: '10px',
                                    backgroundColor: '#67c789',
                                    padding: '10px 20px',
                                    '&:hover': {
                                        backgroundColor: '#d3d3d3',
                                    },
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <SpotifyIcon />
                                    <Typography sx={{ marginLeft: '10px', color: '#fff', fontWeight: 500 }}>
                                        Login with Spotify
                                    </Typography>
                                </Box>
                            </Button>
                        </Paper>
                    </Box>

                    {/* Display text directly on smaller devices */}
                    <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, textAlign: 'center'}}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <img
                                src={Logo}
                                alt="Clone Hero Sync Logo"
                                style={{ width: '100%', borderRadius: '10px' }}
                            />
                        </Box>
                        <Typography variant="h6" sx={{
                            
                            marginBottom: '5%',
                            color:'whitesmoke' 
                        }}>
                            Check for the availability of your <br></br> favorite playlists on Clone Hero.
                        </Typography>
                        
                        <Button variant='soft' onClick={handleLogin} sx={{
                            border: 2,
                            borderRadius: '10px',
                            backgroundColor: '#67c789',
                            display: 'inline-flex',
                            alignItems: 'center',
                        }}>
                            <SpotifyIcon />
                            <Typography sx={{ m: '10px' }}>
                                Login with Spotify
                            </Typography>
                        </Button>
                    </Box>
                </Box>
                <InfoSection />
                <Footer />
            </Box>
        </ThemeProvider>
    );
};

export default Login;
