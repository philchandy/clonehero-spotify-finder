import React, { useState } from 'react';
import { Button, Box, ListItemButton, List, ListItem, Typography, Paper } from '@mui/material';
import { RadioGroup, Radio, FormControlLabel, FormControl, FormLabel, Avatar } from '@mui/material';
import './FetchPlaylist.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

const SelectPlaylistComponent = ({ onPlaylistSelect, playlists, fetchTracks }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

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
        fontWeight: 700,
      },
      h5: {
        fontWeight: 600,
      }
    },
  });

  

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
              <Typography variant="h4">Select a Playlist to check</Typography>
          </Box>
          <Box sx={{
            width:'60%'
          }}>
            <Paper sx={{
              px:'5%',
              borderRadius:'20px'
            }}>
              <Box sx={{pt:'3%', pb:'1%'}}>
                <Typography variant='h6'>From Your Spotify Account</Typography>
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
                  >
                    <FormControlLabel
                      value={playlist.id}
                      control={<Radio />}
                    />
                    <Avatar
                      src={playlist.images && playlist.images.length > 0 ? playlist.images[0]?.url : 'default-image-url'}
                      alt={playlist.name}
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                    <Typography>{playlist.name}</Typography>
                    
                  </Box>
                ))}
              </RadioGroup>
            </Paper>
          </Box>
          <Button variant="contained" onClick={handleFetchTracks} className='fetch-button'>
            Fetch Tracks
          </Button>
      </Box>
    </ThemeProvider>
  );
};

export default SelectPlaylistComponent;



{/* <List>
                  {playlists.map((playlist) => (
                      <ListItem key={playlist.id} disablePadding>
                          <ListItemButton
                              selected={selectedPlaylist?.id === playlist.id}
                              onClick={() => handlePlaylistChange(playlist)}
                              sx={{ display: 'flex', alignItems: 'center' }}
                          >
                              <Box
                                  component="img"
                                  src={playlist.images && playlist.images.length > 0 ? playlist.images[0]?.url : 'default-image-url'} // Assuming images is an array
                                  alt={playlist.name}
                                  sx={{
                                      width: 50,
                                      height: 50,
                                      borderRadius: '4px',
                                      marginRight: 2,
                                  }}
                              />
                              <Typography variant="body1">{playlist.name}</Typography>
                          </ListItemButton>
                      </ListItem>
                  ))}
              </List> */}