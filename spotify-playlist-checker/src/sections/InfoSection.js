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
          h5: {
            fontWeight: 600,
          }
        },
    });
    return(
        <ThemeProvider theme={theme}>
        <Box className='box-center-col'>
            <Box className='box-center-col' sx={{
                pb: { xs: '10%', sm: '15%', md: '5%' }, 
                mx: { xs: '5%', sm: '10%', md: '15%' }, 
                
            }}>
                <Box className='box-center-col' sx={{ textAlign: 'center', mb: '3%' }}>
                    <Typography variant="h3" sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' } }}>
                        How it Works
                    </Typography>
                    <Typography variant="h5" sx={{ mt: '3%', fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem', lg: '2rem' } }}>
                        Connect your Spotify account and get ready to play.
                    </Typography>
                </Box>
                <Box sx={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    gap: { xs: '5%', sm: '5%', md: '3%', lg: '4%' }, 
                    justifyContent: 'space-evenly' ,
                    mb:'15%'
                }}>
                    <Box className='box-center-col' sx={{ px: { xs: '5%', md: '3%' }, py: { md: '1%' } }}>
                        <Typography variant='h5' sx={{ pb: '2%', fontSize: { xs: '1.3rem', sm: '1.5rem', lg: '1.7rem' } }}>
                            Connect to Spotify
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.2rem', lg: '1.4rem' } }}>
                            Login to Spotify through their API so we can see what playlists you have.
                        </Typography>
                    </Box>
                    <Box className='box-center-col' sx={{ px: { xs: '5%', md: '3%' }, py: { md: '1%' } }}>
                        <Typography variant='h5' sx={{ pb: '2%', fontSize: { xs: '1.3rem', sm: '1.5rem', lg: '1.7rem' } }}>
                            Choose a Playlist
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.2rem', lg: '1.4rem' } }}>
                            We'll have you choose a playlist that you would like to check. Maximum of 100 songs.
                        </Typography>
                    </Box>
                    <Box className='box-center-col' sx={{ px: { xs: '5%', md: '3%' }, py: { md: '1%' } }}>
                        <Typography variant='h5' sx={{ pb: '2%', fontSize: { xs: '1.3rem', sm: '1.5rem', lg: '1.7rem' } }}>
                            Find your music
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.2rem', lg: '1.4rem' } }}>
                            We'll show you what songs are available and what songs aren't available at the moment.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    </ThemeProvider>
    );
};

export default InfoSection 