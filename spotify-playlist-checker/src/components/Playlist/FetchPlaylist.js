import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppBarComponent from "./AppBar.js"
import { Box } from '@mui/material';
import './FetchPlaylist.css'; // Import the CSS file

const Playlist = () => {
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
    const [tracks, setTracks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [checkedSongs, setCheckedSongs] = useState([]);

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

    

     // Function to fetch tracks when the button is clicked
    const fetchTracks = async () => {
        const accessToken = localStorage.getItem('spotify_token');
        if (selectedPlaylistId) {
            setLoading(true);
            try {
                const response = await axios.get( `https://api.spotify.com/v1/playlists/${selectedPlaylistId}/tracks?limit=25`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const fetchedTracks = response.data.items; // Store fetched tracks in a local variable
                setTracks(fetchedTracks);
                await checkPlaylistAvailability(fetchedTracks); // Pass the fetched tracks directly to the check function
                console.log('CHECKED SONGS:', checkedSongs)
            } catch (error) {
                console.error('Error fetching tracks:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    // Function to check song availability
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

    const handlePlaylistSelect = (e) => {
        setSelectedPlaylistId(e.target.value);
        // Reset tracks and checkedSongs when a new playlist is selected
        setTracks([]);
        setCheckedSongs([]);
    };

    return (
        <div>
            <AppBarComponent />
            <Box sx={{ p:2 }}>
                <Box >
                    <h1>Select a Playlist</h1>
                    {loading && <p>Loading...</p>}
                    <select onChange={handlePlaylistSelect} value={selectedPlaylistId || ''}>
                        <option value="">Select a playlist</option>
                        {playlists.map(playlist => (
                            <option key={playlist.id} value={playlist.id}>
                                {playlist.name}
                            </option>
                        ))}
                    </select>
                </Box>
                <Box>
                    <button onClick={fetchTracks} disabled={!selectedPlaylistId || loading}>
                        Fetch Tracks and Check Availability
                    </button>
                </Box>
                {tracks.length > 0 && (
                    <>
                        <h2>Tracks in Playlist:</h2>
                        <ul>
                            {tracks.map((track, index) => (
                                <li key={index}>
                                    {track.track.name} - {track.track.artists.map(artist => artist.name).join(', ')}
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {checkedSongs.length > 0 && (
                    <>
                        <h2>Song Availability:</h2>
                        <ul>
                            {checkedSongs.map((song, index) => (
                                <li key={index}>
                                    {song.name} by {song.artist} is {song.available ? 'available' : 'not available'}.
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </Box>
        </div>
    );
}



export default Playlist;
