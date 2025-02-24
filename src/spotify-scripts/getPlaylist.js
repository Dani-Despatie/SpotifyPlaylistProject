import getRefreshToken from "./getRefreshToken";

async function getPlaylist(token, url) {
    const playlistId = url.split('?')[0].split('playlist/')[1]; 
    const apiUrl = `https://api.spotify.com/v1/playlists/${playlistId}`;
    let finalToken = token;

    try {
        // Link validation
        if (!url || !url.includes('open.spotify.com')) {
            throw {status: 400, message: 'Link must be to a Spotify playlist, not another service/website.'};
        }
        else if (!url.includes('open.spotify.com/playlist')) {
            throw {status: 400, message: 'Link must be to a Spotify playlist, not an individual song/artist/etc.'};
        }

        // Getting refresh token if token is likely to be expired
        const tokenTime = window.localStorage.getItem('token_time');
        const time = Date.now();
        if (tokenTime && time - tokenTime > 3300000) {
            const newToken = await getRefreshToken();
            finalToken = newToken.token;
        }

        const res = await fetch(apiUrl, {
            headers:{
                'Authorization': `Bearer ${finalToken}`
            }
        });

        // Doing a manual check of res since errors here don't trigger the catch
        if (res.ok == false) {
            throw {status: res.status, message: res.statusText};
        }
        const data = await res.json();
        const songData = data.tracks.items;
        
        let songs = '';
        songData.forEach((song) => {
            // Getting artist names as a single string
            let artists = '';
            const numOfArtists = song.track.artists.length;
            for (let i = 0; i < numOfArtists; i++) {
                artists += song.track.artists[i].name;
                if (i < numOfArtists - 1) {
                    artists += ', ';
                }
            }

            const minutes = Math.floor(song.track.duration_ms/1000/60);
            let seconds = Math.round((song.track.duration_ms/1000/60 - minutes) * 60);
            if (seconds < 10) 
                seconds = `0${seconds}`;

            songs += `"${song.track.name}", "${artists}", ${minutes}:${seconds} \r\n`;
        });

        return {
            title: data.name,
            songs
        };
    } catch (err) {
        if (err.status == 404) {
            return {status: 404, message: 'Playlist not found. Check link is correct and playlist is set to public'};
        }
        else if (err.message.length == 0 && playlistId.length !== 22) { // This deals with playlist ID being wrong - which returns no error message
            return {status: err.status, message: 'Something is wrong with the link - Playlist ID may be incorrect'};
        }

        else {
            return {status: err.status, message: err.message};
        }
    }
}

export default getPlaylist;