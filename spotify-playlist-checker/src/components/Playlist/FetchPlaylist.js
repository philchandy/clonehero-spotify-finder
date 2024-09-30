import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppBarComponent from "../../sections/AppBar.js"
import { Box, LinearProgress, Typography } from '@mui/material';
import './FetchPlaylist.css'; // Import the CSS file
import SelectPlaylistComponent from './PlaylistComponent.js';
import CheckComponent from './CheckComponent.js';
import Footer from '../../sections/Footer.js'
import Circles from '../../sections/Circles'
import CircularProgress from '@mui/material/CircularProgress';
import apiBaseUrl from '../ApiConfig'


const Playlist = () => {
    const [playlists, setPlaylists] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [checkedSongs, setCheckedSongs] = useState([]);
    const [isTracksFetched, setIsTracksFetched] = useState(false);
    

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

                await axios.post(`${apiBaseUrl}/api/check-songs`, { songs })
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
        setIsTracksFetched(false);
    };

    return (
        <>
        <Box sx={{
            display:'flex',
            height:'100%',
            alignItems:'center',
            justifyContent:'space-between',
            flexDirection:'column',
            width: '100%',
            
            }}>
            <AppBarComponent />
            <Box sx={{ 
                width:'100%', 
                }}>
                {!isTracksFetched? (
                    <>
                        {!loading ? (
                            <>
                                <SelectPlaylistComponent playlists={playlists} fetchTracks={fetchTracks} />
                            </>
                        ) : (
                            <>
                            <Box sx={{}}>
                                <Typography variant='subtitle1' color='white' sx = {{textAlign:'center', fontWeight:'bold'}}>
                                    Loading...
                                </Typography>
                            </Box>
                            </>
                        )}
                    </>
                ) : (
                    <CheckComponent 
                        tracks={checkedSongs} 
                        goBack={handleGoBack}
                    />
                )}
            </Box>
            <Box sx={{width:'100%'}}>
                <Footer />
            </Box>
            
        </Box>
        </>
    );
}



export default Playlist;
