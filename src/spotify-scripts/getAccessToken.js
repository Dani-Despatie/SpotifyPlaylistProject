const clientId = '5dbe95f97d7443caaecf8e5ad77efe6b';
const redirectUri = 'http://localhost:3000/callback';
const scopes = 'user-read-private user-read-email';
const authEndpoint = 'https://accounts.spotify.com/authorize';
const tokenEndpoint = 'https://accounts.spotify.com/api/token';
const responseType = 'code';
const devmode = process.env.NODE_ENV;


async function getAccessToken() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (!code) {
        console.log('Error: no code in params');
        return;
    }
    console.log('Code: ', code);

    const codeVerifier = sessionStorage.getItem('codeVerifier');
    console.log('Code Verifier: ', codeVerifier);


    try {
        const res = await fetch(tokenEndpoint, {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectUri,
                client_id: clientId,
                code_verifier: codeVerifier
            })
        });

        console.log(res);
    } catch(err) {
        console.log(err);
    }
        

}

export default getAccessToken;