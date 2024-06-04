// server.js (modified)
const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const path = require('path');

const app = express();
const port = 3000;

const clientId = '1247694110878335066'; // Replace with your Discord bot's client ID
const clientSecret = 'YqCB0qrknw3im9HoSEsH9H_9NEg8Nf2y'; // Replace with your Discord bot's client secret
const redirectUri = 'http://localhost:3000/callback'; // Replace with your redirect URI

app.use(express.static(path.join(__dirname, 'public')));

app.get('/callback', async (req, res) => {
    const code = req.query.code;

    if (!code) {
        return res.status(400).send('No code provided');
    }

    try {
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/MTI0NzY5NDExMDg3ODMzNTA2Ng.GF1M6m.Cb6AOiq3OMd2lSypH5cuWdcOTqNjSYeDLQRm4Q', querystring.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const accessToken = tokenResponse.data.access_token;

        const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const user = userResponse.data;

        // Here you can handle the user data, e.g., send it back to Discord
        res.send(`Hello, ${user.username}! You have been verified.`);
    } catch (error) {
        res.status(500).send('Error during verification');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
