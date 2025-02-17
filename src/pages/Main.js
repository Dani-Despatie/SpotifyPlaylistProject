import React from 'react';
import { useEffect, useState } from 'react';

// Component Imports
import StandardButton from '../components/StandardButton';
import authorization from '../spotify-scripts/authorization';
import getPlaylist from '../spotify-scripts/getPlaylist';


function Main() {
    const [songList, setSongList] = useState(null);
    const [link, setLink] = useState(null);
    const [downloadLink, setDownloadLink] = useState(null);
    const [errMessage, setErrMessage] = useState(null);
    const [token, setToken] = useState(null);

    // Gets token if it exists or calls for authorization
    useEffect(() => {
        function getToken() {
            const token = window.localStorage.getItem('access_token');
            if (token) {
                setToken(token);
                console.log('token found');
            }
            else {
                authorization();
                console.log('No token found');
            }
        }
        getToken();
    }, [])

    // Gets the list of songs OR identifies errors
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

    // Submit handler for the playlist link
    function submitHandler() {
        event.preventDefault();
        setLink(event.target.playlistUrl.value);
    }

    // Creates the download link
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
                {errMessage && <p>Error: {errMessage}</p>}
            </div>

        </div>
    )
}

export default Main;