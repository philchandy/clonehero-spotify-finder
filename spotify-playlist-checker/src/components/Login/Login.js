import React from 'react';
import { Grid } from '@mui/material/';
import { Button, Typography, Paper, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Login = () => {
    const handleLogin = () => {
        window.location.href = 'http://localhost:3001/login';
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
            <Box sx={{ 
                display:'flex', 
                height:'100vh', 
                paddingLeft:'3%',
                alignItems:'flex-start', 
                justifyContent:'center',  
                flexDirection:'column',
            }}>
                <Paper square={false} elevation={3} sx={{
                    padding:'2%',
                    
                    flexDirection:'column',  
                }}>
                    <Typography variant="h3" sx={{
                        marginBottom:'3%',
                        padding:'5%',
                        textAlign:'flex-start'
                    }}>
                        Welcome to the Spotify Playlist Checker for Clone Hero
                    </Typography>
                    <Button onClick={handleLogin} sx={{
                        marginBottom:'3%',
                        marginLeft:'5%',
                    }}>
                        Login with Spotify
                    </Button>
                </Paper>
            </Box>
        </ThemeProvider>
    );
};

export default Login;
