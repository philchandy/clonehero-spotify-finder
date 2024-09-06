import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppBarComponent from "./AppBar.js"
import { Box, LinearProgress, Typography } from '@mui/material';
import './FetchPlaylist.css'; // Import the CSS file
import SelectPlaylistComponent from './PlaylistComponent.js';
import CheckComponent from './CheckComponent.js';

const Playlist = () => {
    const [playlists, setPlaylists] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [checkedSongs, setCheckedSongs] = useState([]);
    const [isTracksFetched, setIsTracksFetched] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);

    useEffect(() => {
        const fetchPlaylists = async () => {
            const accessToken = localStorage.getItem('spotify_token');
            if (!accessToken) {
                setError('Access token is missing. Please log in again.');
                return;
            }
            try {
                const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setPlaylists(response.data.items);
            } catch (error) {
                console.error('Error fetching playlists:', error);
                setError('Failed to fetch playlists. Please try again.');
            }
        };
        fetchPlaylists();
    }, []);

    const fetchTracks = async (playlistId) => {
        const accessToken = localStorage.getItem('spotify_token');
        if (playlistId) {
            setLoading(true);
            try {
                const response = await axios.get( `https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const fetchedTracks = response.data.items; 
                await checkPlaylistAvailability(fetchedTracks); 
            } catch (error) {
                console.error('Error fetching tracks:', error);
            } finally {
                setIsTracksFetched(true);
                setLoading(false);
            }
        }
    };

    const checkPlaylistAvailability = async (fetchedTracks) => {
        if (fetchedTracks && fetchedTracks.length > 0) {
            try {
                const songs = fetchedTracks.map(track => ({
                    name: track.track.name,
                    artist: track.track.artists.map(artist => artist.name).join(', '),
                }));
                console.log("PAYLOAD: ", songs)

                await axios.post('http://localhost:3001/check-songs', { songs })
                    .then(response => {
                        setCheckedSongs(response.data);
                        console.log("CHECK RESPONSE: ",response.data)
                    })
            } catch (error) {
                console.error('Error checking playlist availability:', error);
            }
        }
    };
    const handleGoBack = () => {
        setIsTracksFetched(false); // Switch to playlist selector view
    };
    const handlePlaylistSelect = (playlist) => {
        setSelectedPlaylist(playlist);
        console.log('Selected Playlist:', playlist);
    };

    return (
        <div>
            <AppBarComponent />
            <Box sx={{ p:2 }}>
                {!isTracksFetched? (
                    <>
                    {!loading ? (
                        <>
                            <SelectPlaylistComponent onPlaylistSelect={handlePlaylistSelect} playlists={playlists} fetchTracks={fetchTracks} />
                        </>
                    ): (
                        <Box>
                            <LinearProgress />
                            <Box sx={{ 
                                    display: "flex",
                                    width:'100%' ,
                                    justifyContent:'center',
                                    alignItems:'center',
                                    height: '100%',
                                    marginTop:'25%'
                                }}> 
                                <Typography variant='h4' component='h1' color='textPrimary' sx = {{ textAlign:'center', fontWeight:'bold' }}>
                                    Loading...
                                </Typography>
                            </Box>
                        </Box>
                    )}
                    </>
                ) : (
                    <CheckComponent 
                        tracks={checkedSongs} 
                        goBack={handleGoBack}
                    />
                )}
            </Box>
        </div>
    );
}



export default Playlist;