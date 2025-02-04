
const clientId = '5dbe95f97d7443caaecf8e5ad77efe6b';
const redirectUri = 'http://localhost:3000/callback';
const scope = 'user-read-private';
const authEndpoint = new URL('https://accounts.spotify.com/authorize');
const responseType = 'code';


// Functions for creating verification
function generateRandomString(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random()*possible.length));
    }
    return text;
}
async function generateCodeChallenge(codeVerifier) {
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(codeVerifier)).then(buffer => {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    });
}


async function getAuthorizationCode() {
    // Setting up the verification parameters
    const codeVerifier = generateRandomString(64);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const authUrl = `${authEndpoint}?response_type=${responseType}&client_id=${clientId}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}&code_challenge_method=S256&code_challenge=${codeChallenge}`;

    const params =  {
        response_type: 'code',
        client_id: clientId,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
    };
 
    window.sessionStorage.setItem('codeVerifier', codeVerifier);
    window.location.href = authUrl;
}

export default getAuthorizationCode;