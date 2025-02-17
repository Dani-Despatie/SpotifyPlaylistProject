
const url = "https://accounts.spotify.com/api/token";
const cliendId = '5dbe95f97d7443caaecf8e5ad77efe6b';

async function getRefreshToken() {

    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      console.log('No refresh token found');
    }
    
    const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          client_id: cliendId
        }),
    }
    const res = await fetch(url, payload);
    const data = await res.json();

    if (data) {
      window.localStorage.setItem('access_token', data.access_token);
      window.localStorage.setItem('refresh_token', data.refresh_token);
      window.localStorage.setItem('token_time', Date.now())
    }

    console.log('Refresh Token acquired successfully');
}

export default getRefreshToken;