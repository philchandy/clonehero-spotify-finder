import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Paper, RadioGroup, Radio, FormControlLabel, Avatar } from '@mui/material';
import './FetchPlaylist.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

const SelectPlaylistComponent = ({ playlists, fetchTracks }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [isAtBottom, setIsAtBottom] = useState(false);

  const handlePlaylistChange = (event) => {
    const playlistId = event.target.value;
    setSelectedPlaylist(playlistId);
    console.log('Selected playlist: ', playlistId )
  };

  const handleFetchTracks = () => {
    if (selectedPlaylist) {
        fetchTracks(selectedPlaylist); // Fetch tracks for the selected playlist
        console.log('Fetching tracks for playlist:', selectedPlaylist);
    } else {
        console.log('No playlist selected');
    }
  };
  const theme = createTheme({
    typography: {
      h6: {
        fontWeight: 700,
      },
      h4: {
        fontWeight: 500,
      },
      h5: {
        fontWeight: 600,
      },
      subtitle1: {
        fontWeight:700,
      }
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      console.log('Component mounted');
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      console.log('Scroll Position:', scrollTop, 'Window Height:', windowHeight, 'Doc Height:', docHeight);


      if (windowHeight + scrollTop >= docHeight - 100) {
        setIsAtBottom(true);
        console.log('SCROLLED TO BOTTOM')
      } else {
        setIsAtBottom(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        position:'relative'
        }}>
          <Box sx={{ marginY:"2%", display:'flex', alignItems:'center' }}>
              <Typography variant="h4" sx={{color:'white', textAlign:'center', font: 'caption', fontSize:{md:'x-large'}}}>Select a Playlist to check.</Typography>
          </Box>
          <Box sx={{
            width:{xs:'90%', sm:'90%', md:'65%', lg:'50%'}
          }}>
            <Paper sx={{
              px:{ xs: '4%', sm: '5%' },
              mb:'4%',
              borderRadius:'20px'
            }}>
              <Box sx={{ py:'1%'}}>
                <Typography 
                variant='h6'
                sx={{
                  fontSize: { xs: '14px', sm: '18px' },
                  textAlign: 'center',
                }}
                >
                  From Your Spotify Account: 
                </Typography>
              </Box>
              <Divider />
              <RadioGroup
                aria-label="playlists"
                value={selectedPlaylist}
                onChange={handlePlaylistChange}
              >
                {playlists.map((playlist) => (
                  <Box
                    key={playlist.id}
                    display="flex"
                    alignItems="center"
                    mb={2}
                    sx={{
                      flexWrap:'wrap',
                      justifyContent:'space-between',
                      width:'100%'
                    }}
                  >
                    <FormControlLabel
                      value={playlist.id}
                      control={<Radio />}
                      sx={{
                        width: '10%', 
                        minWidth: '40px', 
                      }}
                    />
                    <Avatar
                      src={playlist.images && playlist.images.length > 0 ? playlist.images[0]?.url : 'default-image-url'}
                      alt={playlist.name}
                      sx={{ width: 56, height: 56, mr: 2, minWidth: '48px' }}
                    />
                    <Typography sx={{
                      flex: 1,
                      fontSize: { xs: '12px', sm: '16px' },
                      wordBreak: 'break-word',
                    }}>
                      {playlist.name}
                    </Typography>
                    
                  </Box>
                ))}
              </RadioGroup>
            </Paper>
          </Box>
      </Box>
      <Button 
      variant="contained" 
      onClick={handleFetchTracks} 
      className='fetch-button-fixed'
      disabled={!selectedPlaylist}
      sx={{
        boxShadow:"8",
        position: isAtBottom ? 'static' : 'fixed',
        bottom: isAtBottom ? 'auto' : '8%',
        left: isAtBottom ? 'auto' : '50%',
        transform: isAtBottom ? 'none' : 'translateX(-50%)',
        zIndex: isAtBottom ? 'auto' : 1000,
        marginTop: isAtBottom ? '16px' : '0',
        }}>
           <Typography variant='subtitle1'>Fetch Tracks</Typography>
      </Button>
    </ThemeProvider>
  );
};

export default SelectPlaylistComponent;
