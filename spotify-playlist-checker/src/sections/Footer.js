import React from "react"
import { Box, Typography, Link, IconButton } from '@mui/material';

import GitHubIcon from '@mui/icons-material/GitHub';
import PublicIcon from '@mui/icons-material/Public';


const Footer = () => {
    

    return (
        <Box component="footer" sx={{ position: 'relative', overflow: 'hidden'}}>
            <Box sx={{ 
                backgroundColor: "#222222", 
                p: 2, 
                color: 'white', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'stretch',
                flexDirection:'column',
                }}>
                <Box sx={{
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'space-between'
                }}> 
                    <Box>
                        <Link href="https://www.privacypolicies.com/generic/" target="_blank" underline="hover" color="inherit" sx={{ mr: 2 }}>Privacy</Link>
                        <Link href="#" target="_blank" underline="hover" color="inherit">Contact Me</Link>
                    </Box>
                    <Box>
                        <IconButton href="https://github.com/philchandy/clonehero-spotify-finder" target="_blank" color="inherit">
                            <GitHubIcon width="40" height="40" />
                        </IconButton>
                        <IconButton href="#" target="_blank" color="inherit">
                            <PublicIcon width="40" height="40" />
                        </IconButton>
                    </Box>
                </Box>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="caption">
                            ©2024 Phillip Chandy. All rights reserved. Various trademarks held by their respective owners.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer