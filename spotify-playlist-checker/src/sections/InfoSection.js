import React from "react";
import { Box, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const InfoSection = () => {
    const theme = createTheme({
        typography: {
          h6: {
            fontWeight: 500,
          },
          h2: {
            fontWeight: 700,
          },
          h4: {
            fontWeight: 500,
          }
        },
    });
    return(
        <ThemeProvider theme={theme}>
            <Box className='box-center-col' sx={{
                backgroundColor:'#67c789',
                pt:'5%',
                pb:'30%',
                }}> 
                <Box className='box-center-col'>
                    <Typography variant="h2">How it Works</Typography>
                    <Typography variant="h4" sx={{mt:'5%'}}>Connect your spotify account and get ready to play.</Typography>
                </Box>
                <Box className='box-center-row'>
                    <Box className='box-center-col'>
                        <Typography variant='h4' sx={{p:'4%'}} >1. Login to Spotify</Typography>
                        <Typography variant="h6"  >Login to Spotify through their API so we can see what playlists you have.</Typography>
                        
                    </Box>
                    <Box className='box-center-col'>
                        <Typography variant='h4' sx={{p:'4%'}} > 2. Choose a Playlist</Typography>
                        <Typography variant="h6">We'll have you choose a playlist that you would like to check. Maximum of 100 songs.</Typography>
                    
                    </Box>
                    <Box className='box-center-col'>
                        <Typography variant='h4' sx={{p:'4%'}} >3. Find the availability of your music</Typography>
                        <Typography variant="h6">We'll show you what songs are available and what songs aren't available at the moment.</Typography>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default InfoSection 