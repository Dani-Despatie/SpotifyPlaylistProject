import getRefreshToken from "./getRefreshToken";

async function getPlaylist(token, url) {
    const playlistId = url.split('?')[0].split('playlist/')[1]; 
    const apiUrl = `https://api.spotify.com/v1/playlists/${playlistId}`;
    let finalToken = token;

    try {
        console.log("Validating playlist link...");
        // Link validation
        if (!url || !url.includes('open.spotify.com')) {
            throw {status: 400, message: 'Link must be to a Spotify playlist, not another service/website.'};
        }
        else if (!url.includes('open.spotify.com/playlist')) {
            throw {status: 400, message: 'Link must be to a Spotify playlist, not an individual song/artist/etc.'};
        }

        // Getting playlist data
        const data = await fetchPlaylist(finalToken, apiUrl, 0);
        const songData = data.tracks.items;

        let songs = '';
        let totalLength = 0;
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

            songs += `"${song.track.name}", "${artists}", ${msToString(song.track.duration_ms, 1)} \r\n`;
            totalLength += song.track.duration_ms;
        });

        songs += `\r\n "", "Total Duration", "${msToString(totalLength, 2)}"`;
        console.log("Playlist data parsed");

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

function msToString(ms, numColons) {
    let hrs, mins, secs;
    // Seconds only
    if (numColons == 0) {
        secs = Math.floor(ms/1000);
        
        return (`${secs}`);
    }
    // Includes minutes
    if (numColons == 1) {
        mins = Math.floor(ms/1000/60);
        secs = Math.round(ms/1000 - 60 * mins);

        if (mins < 10)
            mins = `0${mins}`;
        if (secs < 10)
            secs = `0${secs}`;

        return (`${mins}:${secs}`);
    }
    // Includes hours
    if (numColons == 2) {
        hrs = Math.floor(ms/1000/60/60);
        mins = Math.floor(ms/1000/60 - 60 * hrs);
        secs = Math.round(ms/1000 - 60 * mins - 60 * 60 * hrs);

        if (mins < 10)
            mins = `0${mins}`;
        if (secs < 10)
            secs = `0${secs}`;

        return (`${hrs}:${mins}:${secs}`);
    }

    console.log("Improbable numColons value - reasses");
    return null;
}

async function fetchPlaylist(token, apiUrl, attempt) {
    const res = await fetch(apiUrl, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    console.log(res);

    // Returning data on success
    if (res.status === 200) {
        return await res.json();
    }

    // Dealing with errors on failure
    const message = await res.text();
    if (message.includes("expired")) {
        if (attempt < 1) {
            console.log("Token expired - getting new token...");
            const tokenData = await getRefreshToken();
            return fetchPlaylist(tokenData.token, apiUrl, attempt+1);
        }
        throw { status: res.status, message: "Token expired - refresh unsuccessful" };
    }
    
    else {
        throw { status: res.status, message: message };
    }
}

export default getPlaylist;