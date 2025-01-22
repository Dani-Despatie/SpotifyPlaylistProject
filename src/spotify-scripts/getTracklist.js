const SpotifyWebApi = require('spotify-web-api-node');

const { CLIENT_ID, CLIENT_SECRET } = process.env;
const spotifyApi = new SpotifyWebApi({
    cliendId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: 'https://spotify-playlist-project-murex.vercel.app/'
})


// Get Access Token ;.;
async function getAccessToken() {
    
}

async function getTrackList() {
    console.log("hey dood");
}

export default getTrackList;