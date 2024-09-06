const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const puppeteer = require('puppeteer')

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

async function checkSongsAvailability(songs) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });
    const page = await browser.newPage();
    const results = [];

    for (const song of songs) {
        console.log(`Checking availability for: ${song.name} by ${song.artist}`);
        let name = (song.name.toString()).replace(/\s/g,'%20')
        let artist = (song.artist.toString()).replace(/\s/g,'%20')
        const searchUrl = `https://www.enchor.us/?instrument=guitar&difficulty=expert&name=${name}&artist=${artist}&minIntensity=0&maxIntensity=6`

        try{
            await page.goto(searchUrl, { waitUntil: 'networkidle2' });
            await page.waitForSelector('span.text-lg', { timeout: 5000 });

            const isAvailable = await page.evaluate(() => {
                try {
                    const HTMLResults = document.querySelectorAll('span.text-lg');
                    let resultData = {
                        elements: parseFloat(HTMLResults[0].textContent),
                    };
                    return resultData;
                } catch (error) {
                    return { error: `Error evaluating page content: ${error.message}` };
                }
            });
            if (isAvailable.error) {
                console.error(isAvailable.error);
                results.push({
                    name: song.name,
                    artist: song.artist,
                    available: false,
                    error: 'Failed to fetch'
                });
            } else {
                const isSongAvailable = (isAvailable.elements > 0) ? true : false;
                console.log("Search Results: ", isAvailable.elements)
                
                results.push({
                    name: song.name,
                    artist: song.artist,
                    available: isSongAvailable
                });
            }
        } catch (error) {
            console.error(`Error checking song "${song.name}" by "${song.artist}":`, error);
            results.push({
                name: song.name,
                artist: song.artist,
                available: false,
                error: 'Failed to fetch'
            });
        }
    }
    await browser.close();
    return results;
} 

app.get('/login', (req,res) => {
    const scopes = 'user-read-private user-read-email playlist-read-private playlist-read-collaborative'
    const spotifyAuthUrl = 'https://accounts.spotify.com/authorize';
    const queryParams = new URLSearchParams({
        response_type:'code',
        client_id: clientId,
        scope: scopes,
        redirect_uri: redirectUri
    });
    res.redirect(`${spotifyAuthUrl}?${queryParams.toString()}`)
});

app.get('/callback', async (req, res) => {
    const authorizationCode = req.query.code;

    try{
        const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
            grant_type: 'authorization_code',
            code: authorizationCode,
            redirect_uri: redirectUri,
            client_id: clientId,
            client_secret: clientSecret,
        }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        const { access_token, refresh_token } = tokenResponse.data;

        res.json({ access_token, refresh_token });
    } catch (error) {
        console.error('Error exchanging code for tokens:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to exchange code for tokens' });
    }
});

app.post('/refresh_token', async (req, res) => {
    const { refresh_token } = req.body;

    try {
        const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
            client_id: clientId,
            client_secret: clientSecret,
        }),{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const { access_token } = tokenResponse.data;
        
        res.json({ access_token });
    } catch (error) {
        console.error('Error refreshing access token:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to refresh access token' });
    }
});

app.post('/check-songs', async (req, res) => {
    const { songs } = req.body;

    console.log('Request received: ', songs);

    if (!songs || !Array.isArray(songs) || songs.length === 0) {
        return res.status(400).json({ error: 'Invalid request payload: An array of song names is required' });
    }

    try {
        const results = await checkSongsAvailability(songs);
        res.json(results);
    } catch (error) {
        console.error('Error processing song list:', error);
        res.status(500).json({ error: 'An error occurred while processing the song list' });
    }
});

app.listen(port, () => {
    console.log(`Spotify Auth server listening at http://localhost:${port}`)
    
})

module.exports = checkSongsAvailability;