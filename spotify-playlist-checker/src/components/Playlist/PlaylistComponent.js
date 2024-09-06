import React, { useState, useEffect } from 'react';
import { Button, Box, FormControl, InputLabel, ListItemButton, List, ListItem, Typography } from '@mui/material';

const SelectPlaylistComponent = ({ onPlaylistSelect, playlists, fetchTracks }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  const handlePlaylistChange = (playlist) => {
    setSelectedPlaylist(playlist);
    console.log('Selected playlist: ', playlist )
  };

  const handleFetchTracks = () => {
    if (selectedPlaylist) {
        fetchTracks(selectedPlaylist.id); // Fetch tracks for the selected playlist
        console.log('Fetching tracks for playlist:', selectedPlaylist);
    } else {
        console.log('No playlist selected');
    }
  };

  return (
    <div>
      <FormControl fullWidth>
        <Box sx={{ marginBottom:"5%" }}>
            <InputLabel id="playlist-select-label">Select a Playlist</InputLabel>
        </Box>
        <Box>
            <List>
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
            </List>
        </Box>
      </FormControl>
      <Button variant="contained" onClick={handleFetchTracks} style={{ marginTop: '20px' }}>
        Fetch Tracks
      </Button>
    </div>
  );
};

export default SelectPlaylistComponent;