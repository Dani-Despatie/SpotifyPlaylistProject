const clientId = '5dbe95f97d7443caaecf8e5ad77efe6b';
const redirectUri = 'http://localhost:3000/callback';
const scopes = 'user-read-private user-read-email'; // Adjust scopes as needed
const authEndpoint = 'https://accounts.spotify.com/authorize';
const tokenEndpoint = 'https://accounts.spotify.com/api/token';
const responseType = 'code';

const logs = [];
function logsToString(logs) {
    if (!logs) {
        return null;
    }

    let logText = '';
    logs.forEach((log) => {
        logText += `${log} \n`;
    })
    return logText;
}

async function copilotAttempt() {
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
  
  function generateCodeChallenge(codeVerifier) {
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(codeVerifier)).then(buffer => {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    });
  }
  
//   document.getElementById('login-button').addEventListener('click', async () => {
//     const codeChallenge = await generateCodeChallenge(codeVerifier);
//     const authUrl = `${authEndpoint}?response_type=${responseType}&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}&code_challenge_method=S256&code_challenge=${codeChallenge}`;
//     window.location.href = authUrl;
//   });
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const authUrl = `${authEndpoint}?response_type=${responseType}&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}&code_challenge_method=S256&code_challenge=${codeChallenge}`;
    window.location.href = authUrl;
    
  
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
  async function fetchTokens(code) {
    try {
        logs.push('fetching tokens...');
    const response = await fetch(tokenEndpoint, {
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
    logs.push(`data: ${data}`);
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token // if needed
    };
    } catch(err) {
        logs.push(err);
    } finally {
        localStorage.setItem('logs-Copilot', logsToString(logs));
    }
  }
  
  // Main function
  async function main() {
    const params = getParams();
    if (params.code) {
      const tokens = await fetchTokens(params.code);
      localStorage.setItem('accessToken', tokens.accessToken); // Save the access token in local storage
      // Optionally save the refresh token
      if (tokens.refreshToken) {
        localStorage.setItem('refreshToken', tokens.refreshToken);
      }
      console.log('Access Token:', tokens.accessToken);
    } else {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        console.log('Stored Access Token:', accessToken);
      }
    }
  }
  
  main();
  localStorage.setItem('logs-Copilot', logsToString(logs));
}

export default copilotAttempt;