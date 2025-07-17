import axios from "axios";

const DEVMODE = false;
const cliendId = '5dbe95f97d7443caaecf8e5ad77efe6b';
const redirectUri = DEVMODE ? 'http://localhost:3000/callback': 'https://spotify-playlist-project-murex.vercel.app/callback';
const tokenEndpoint = 'https://accounts.spotify.com/api/token';

async function callback() {

    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');

    // ADD VERIFICATION - WHAT HAPPENS IF USER SIGN IN FAILS?

    const codeVerifier = localStorage.getItem('code_verifier');
    const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: cliendId,
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier,
        }),
    };

    const res = await fetch(tokenEndpoint, payload);
    const data = await res.json();

    if (data) {
      window.localStorage.setItem('access_token', data.access_token);
      window.localStorage.setItem('refresh_token', data.refresh_token);
      window.localStorage.setItem('token_time', Date.now());

      console.log("getAccessToken -> ", data.access_token, data.refresh_token);
    }

    window.location = '/';
}

export default callback;