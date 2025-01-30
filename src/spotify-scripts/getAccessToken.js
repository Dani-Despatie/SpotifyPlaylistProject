const clientId = '5dbe95f97d7443caaecf8e5ad77efe6b';
const redirectUri = 'https://spotify-playlist-project-murex.vercel.app/callback';
const scopes = 'playlist-read-private';
const authEndpoint = 'https://accounts.spotify.com/authorize';
const responseType = 'code';


// Function to create a random string -> Used to verify user
function generateRandomString(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random()*possible.length));
    }
    return text;
}
// Function to create an encoded version of the Previously Created random string
function generateCodeChallenge(codeVerifier) {
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(codeVerifier)).then(buffer => {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    });
}

function getParams() {
    const params = new URLSearchParams(window.location.search);
    logs.push(`getParams result: ${params}`);
    return params;
}

async function getAccessToken() {
    // Logging in user
    const randomString = generateRandomString(64);
    const codeChallenge = await generateCodeChallenge(randomString);
    const authUrl = `${authEndpoint}?response_type=${responseType}&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}&code_challenge_method=S256&code_challenge=${codeChallenge}`;
    console.log('Strings set');

    window.location.href = authUrl; 
    const params = getParams();
    if (!params.code) {
        console.log('Error: no code in params');
        localStorage.setItem('errParam', 'No code in params');
        return;
    }

    try {
        const res = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: params.code,
                redirect_uri: redirectUri,
                client_id: clientId,
                code_verifier: codeVerifier
            })
        });
        const token = await res.json().access_token;

        localStorage.setItem('token', token);
        return token;
    } catch(err) {
        localStorage.setItem('errFetch', err);
    }
}

export default getAccessToken;