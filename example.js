const clientId = '5dbe95f97d7443caaecf8e5ad77efe6b';
const redirectUri = 'http://localhost:3000/callback';
const scopes = 'playlist-read-private';
const authEndpoint = 'https://accounts.spotify.com/authorize';
const responseType = 'code';

// Generate a code verifier and a code challenge
function generateRandomString(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

const codeVerifier = generateRandomString(128);
const test = new URL()

function generateCodeChallenge(codeVerifier) {
  return crypto.subtle.digest('SHA-256', new TextEncoder().encode(codeVerifier)).then(buffer => {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  });
}

document.getElementById('login-button').addEventListener('click', async () => {
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const authUrl = `${authEndpoint}?response_type=${responseType}&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}&code_challenge_method=S256&code_challenge=${codeChallenge}`;
  window.location.href = authUrl;
});

// Function to parse the URL parameters
function getParams() {
  const params = {};
  const queryString = window.location.search.substring(1);
  const regex = /([^&=]+)=([^&]*)/g;
  let match;
  while ((match = regex.exec(queryString))) {
    params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
  }
  return params;
}

// Exchange authorization code for access token
async function fetchAccessToken(code) {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: codeVerifier
    })
  });
  const data = await response.json();
  return data.access_token;
}

// Fetch playlist tracks
async function fetchPlaylistTracks(accessToken, playlistId) {
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const data = await response.json();
  return data.items.map(item => item.track.name);
}

// Main function
async function main() {
  const params = getParams();
  if (params.code) {
    const accessToken = await fetchAccessToken(params.code);
    const playlistId = '3cEYpjA9oz9GiPac4AsH4n'; // Replace with your playlist ID
    const tracks = await fetchPlaylistTracks(accessToken, playlistId);
    document.getElementById('tracks').innerText = tracks.join('\n');
  }
}

main();
