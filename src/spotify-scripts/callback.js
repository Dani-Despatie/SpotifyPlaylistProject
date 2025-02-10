
function callback() {
    const hash = window.location.hash;
    const token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1];
    const date = Date.now();
    
    if (token) {
        window.localStorage.setItem('token', `${token}&${date}`);
    }
    window.location = '/'
}

export default callback;