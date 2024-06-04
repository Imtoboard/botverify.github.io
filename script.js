// script.js
document.getElementById('verifyBtn').addEventListener('click', () => {
    const clientId = '1247694110878335066'; // Replace with your Discord bot's client ID
    const redirectUri = encodeURIComponent('http://localhost:3000/callback'); // Replace with your redirect URI
    const scope = encodeURIComponent('identify');

    const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=1247694110878335066&permissions=8&scope=botclient_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

    window.location.href = discordAuthUrl;
});
