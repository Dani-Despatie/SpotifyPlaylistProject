import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

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
    const [playlistName, setPlaylistName] = useState(null);
    const [showInstructions, setShowInstructions] = useState(false);

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
            if (!songs.title) {
                setErrMessage(songs.message);
            }
            else {
                setSongList(songs.songs);
                setPlaylistName(songs.title);
                setErrMessage(null);
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
        if (!event.target.playlistUrl.value) {
            setErrMessage('Please provide a link to the desired playlist');
        }
        else {
            setErrMessage(null);
        }
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
        <div className='container'>
            <h2>Have a playlist you want as CSV?</h2>
            <p>
                Input the a link to the playlist here, and we'll 
            </p>
            <form onSubmit={submitHandler} className='playlist-form'>
                <label htmlFor='playlistUrl'>Paste link here:</label>
                <input type='url' id='playlistUrl' className='url-input' /> 
                <StandardButton type='submit'>Get CSV</StandardButton>
            </form>

            <div className='download'>
                {downloadLink && playlistName && !errMessage && <a href={downloadLink} download='SpotifyPlaylist'>Download <i>"{playlistName}"</i> as CSV</a>}
            </div>

            <div className='errorMessage'>
                {errMessage && <p>Error: {errMessage}</p>}
            </div>

        </div>
    )
}

export default Main;