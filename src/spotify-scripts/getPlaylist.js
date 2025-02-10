

async function getPlaylist(token, url) {
    const playlistId = url.split('?')[0].split('playlist/')[1]; 
    const apiUrl = `https://api.spotify.com/v1/playlists/${playlistId}`;

    try {
        // Link validation
        if (!url || !url.includes('open.spotify.com')) {
            throw {status: 400, message: 'Link must be to a Spotify playlist, not another service/website.'};
        }
        else if (!url.includes('open.spotify.com/playlist')) {
            throw {status: 400, message: 'Link must be to a Spotify playlist, not an individual song/artist/etc.'};
        }

        const res = await fetch(apiUrl, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });

        // Doing a manual check of res since errors here are shown in console without being thrown
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
            
            songs += `"${song.track.name}", "${artists}" \r\n`;
        });

        return songs;
    } catch (err) {
        if (err.status == 404) {
            return {status: 404, message: 'Playlist not found. Check link is correct and playlist is not private'};
        }

        else {
            return {status: err.status, message: err.message};
        }
    }
}

export default getPlaylist;