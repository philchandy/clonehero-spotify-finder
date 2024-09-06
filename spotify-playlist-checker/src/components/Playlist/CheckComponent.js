import React from 'react';
import { Button, Box } from '@mui/material';
import './FetchPlaylist.css';

const CheckComponent = ({ tracks, goBack }) => {

    return (
        <div>
        <h3>Song Availability</h3>
        {tracks.length > 0 ? (
            <ul>
            {tracks.map((track, index) => (
                <li key={index}>
                {track.name} by {track.artist} - {track.available ? 'Available' : 'Not Available'}
                </li>
            ))}
            </ul>
        ) : (
            <p>No tracks available.</p>
        )}
        

        {/* Go Back Button */}
        <Button onClick={goBack} style={{ marginTop: '20px' }}>
            Go Back
        </Button>
        </div>
    );
};

export default CheckComponent;