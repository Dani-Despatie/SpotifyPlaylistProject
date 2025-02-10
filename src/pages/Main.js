import React from 'react';
import { useEffect, useState } from 'react';

// Component Imports
import StandardButton from '../components/StandardButton';
import authorization from '../spotify-scripts/authorization';
import getPlaylist from '../spotify-scripts/getPlaylist';


function Login() {
    const [songList, setSongList] = useState(null);
    const [link, setLink] = useState(null);
    const [downloadLink, setDownloadLink] = useState(null);
    const [errMessage, setErrMessage] = useState(null);

    authorization();
    const token = window.localStorage.getItem('token').split('&')[0];

    // This allows us to use an async function within the front-end code
    useEffect(() => {
        async function songListSetter () {
            const songs = await getPlaylist(token, link);

            if (typeof(songs) == 'object') {
                setErrMessage(songs.message);
            }
            else {
                setSongList(songs);
            }
        }
        if (link) {
            songListSetter();
        }
    }, [link])

    // Submit handler
    function submitHandler() {
        event.preventDefault();
        setLink(event.target.playlistUrl.value);
    }

    useEffect(() => {
        function downloadBlob(content) {
            const blob = new Blob([content], {type: 'text/csv;charset=utf-8;'});
            const url = URL.createObjectURL(blob);

            setDownloadLink(url);
        }
        if (songList) {
            downloadBlob(songList);
        }
    }, [songList]);

    return (
        <div>
            <p>Welcome to the Main Page!</p>

            <form onSubmit={submitHandler}>
                <label htmlFor='playlistUrl'>Have a Spotify Playlist you want as csv? Paste the link here:</label>
                <input type='url' id='playlistUrl' />
                <StandardButton type='submit'>Get CSV</StandardButton>
            </form>

            {downloadLink && !errMessage && <a href={downloadLink} download='SpotifyPlaylist'>Download CSV</a>}

            <div className='errorMessage'>
                {errMessage && <p>{errMessage}</p>}
            </div>

        </div>
    )
}

export default Login;