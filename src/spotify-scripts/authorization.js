const CLIENT_ID = '5dbe95f97d7443caaecf8e5ad77efe6b';
const REDIRECT_URI = 'http://localhost:3000/callback';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';


function authorization() {
    const tokenString = window.localStorage.getItem('token');
    let token = null;
    const date = Date.now();

    if (tokenString) {
        token = tokenString.split('&'); // index 0 = token itself, index 1 = time token was created
    }

    if (!tokenString || Number(token[1]) + 3000000 < date) { // no token or token was created more than 50 mins ago
        window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
        console.log('Got new token');
    }
    return true;
}

export default authorization;