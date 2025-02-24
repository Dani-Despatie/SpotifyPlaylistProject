const cliendId = '5dbe95f97d7443caaecf8e5ad77efe6b';
const redirectUri = 'https://spotify-playlist-project-murex.vercel.app/callback';
const authEndpoint = new URL('https://accounts.spotify.com/authorize');
const scope = 'user-read-private';

function generateRandomString(length) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        randomString += possible.charAt(Math.floor(Math.random() * length));
    }
    return randomString;
}

async function generateCodeChallenge(text) {
    const encoder = new TextEncoder(); 
    const data = await window.crypto.subtle.digest('SHA-256', encoder.encode(text));
    return btoa(String.fromCharCode(...new Uint8Array(data)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}


async function authorization() {
    const codeVerifier = generateRandomString(64);
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    window.localStorage.setItem('code_verifier', codeVerifier);

    const params = {
        response_type: 'code',
        client_id: cliendId,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
    };
    
    authEndpoint.search = new URLSearchParams(params).toString();
    window.location.href = authEndpoint.toString();
}

export default authorization;