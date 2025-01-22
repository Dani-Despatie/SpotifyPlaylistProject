// Generate a code verifier and a code challenge
function generateRandomString(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  console.log(text);
  return text;
}



function generateCodeChallenge() {
  const codeVerifier = generateRandomString(128);
  const result = crypto.subtle.digest('SHA-256', new TextEncoder().encode(codeVerifier)).then(buffer => {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  });
  console.log(result);
  return result;
}

export { generateRandomString, generateCodeChallenge };