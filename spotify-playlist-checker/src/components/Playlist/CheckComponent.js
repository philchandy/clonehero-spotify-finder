import React from 'react';
import { Button, Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import './FetchPlaylist.css';
import { CheckCircle, Cancel } from '@mui/icons-material';

const CheckComponent = ({ tracks, goBack }) => {


    return (
        <Box sx={{
            minHeight:'100vh',
            
        }}>
            <Box sx={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center'
            }}>
                <Typography variant="h6" sx={{color:'white', font:'semibold', py:'2%'}} >Song Availability</Typography>
                <Paper sx={{
                    mt:'1%',
                    py:'0',
                    borderRadius:'20px',
                    width: '50%',
                }}>
                    {tracks.length > 0 ? (
                        <List sx={{
                            py:"0",
                        }}>
                        {tracks.map((track, index) => (
                            <ListItem 
                                key={index}
                                sx={{
                                    border:'none',
                                    borderRadius:'20px',
                                }}>
                                <ListItemIcon>
                                    {track.available ? <CheckCircle color="success" /> : <Cancel color="error" />}
                                </ListItemIcon>
                                <ListItemText
                                    primary={track.name}
                                    secondary={`by ${track.artist}`}
                                />
                            </ListItem>
                        ))}
                        </List>
                    ) : (
                        <p>No tracks available.</p>
                    )}
                </Paper>
                <Button variant="contained" onClick={goBack} style={{ marginTop: '20px' }}>
                    Go Back
                </Button>
            </Box>
        </Box>
    );
};

export default CheckComponent;