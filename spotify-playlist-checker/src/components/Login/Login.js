import React from 'react';
import { Button, Typography, Paper, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../../sections/Footer';
import {ReactComponent as SpotifyIcon} from '../../assets/spotify.svg'
import InfoSection from '../../sections/InfoSection';
import Circles from '../../sections/Circles'

const Login = () => {
    const handleLogin = () => {
        window.location.href = 'http://localhost:3001/api/login';
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
            <Box sx={{zIndex:"1", position:'relative'}}>
                <Box sx={{ 
                    display:'flex', 
                    minHeight:'100vh', 
                    paddingLeft:'3%',
                    alignItems:'flex-start', 
                    justifyContent:'center',  
                    flexDirection:'column',
                    // backgroundColor:"#67c789",
                    
                }}>
                    <Paper  elevation={3} sx={{
                        padding:'5%',
                        flexDirection:'column',  
                        width:'800px',
                        borderRadius:'40px'
                    }}>
                        <Typography variant="h3" sx={{
                            
                            textAlign:'flex-start',
                            textWrap:'wrap',
                        }}>
                            Check for the availability of you favorite playlists on Clone Hero.
                        </Typography>
                        <Typography variant="h5" sx={{
                            marginTop:'5%',
                            marginBottom:'5%',
                            
                        }}>
                            Search. Pick. Play.
                        </Typography>
                        <Button variant='soft' onClick={handleLogin} sx={{
                            border:2,
                            borderRadius:'10px',
                            backgroundColor:'#67c789',
                            
                        }}>
                            <Box sx={{
                                display:'flex',
                                alignItems:'center'
                            }}>
                                <SpotifyIcon />
                                <Typography sx={{m:'10px'}}>
                                    Login with Spotify
                                </Typography>
                            </Box>
                        </Button>
                    </Paper>
                    
                </Box>
                <InfoSection />
                <Footer />
            </Box>
        </ThemeProvider>
    );
};

export default Login;
