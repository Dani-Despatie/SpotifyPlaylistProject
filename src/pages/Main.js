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
            if (token && token !== 'undefined') {
                setToken(token);
            }
            else {
                authorization();
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
                setSongList(null);
                setPlaylistName(null);
                setDownloadLink(null);
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
            setPlaylistName(null);
            setSongList(null);
            setDownloadLink(null);
        }
        else {
            setErrMessage(null);
        }
    }

    // Show instructions button
    function showInstructionsHandler() {
        event.preventDefault();
        if (showInstructions) {
            setShowInstructions(false);
        }
        else {
            setShowInstructions(true);
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
            <h2>Have a playlist you want in Excel?</h2>
            <p>
                Input the a link to the playlist, and we'll do the conversion dance!
            </p>
            <form onSubmit={submitHandler} className='playlist-form'>
                <label htmlFor='playlistUrl'>Paste link here:</label>
                <div className = 'input'>
                    <input type='url' id='playlistUrl' className='url-input' />
                    <button className = 'instr-button' type = 'button' onClick = {showInstructionsHandler}>?</button>
                </div>

                <div className = ''>
                    <StandardButton type='submit'>Get CSV</StandardButton>
                    {status == 'loading' && <p>Loading...</p>}
                </div>
            </form>

            <div className='download'>
                {downloadLink && playlistName && !errMessage && <a href={downloadLink} download='SpotifyPlaylist'>Download <i>"{playlistName}"</i> as CSV</a>}
            </div>

            <div className='errorMessage'>
                {errMessage && <p>Error: {errMessage}</p>}
            </div>

            <div className = 'instructions' hidden = {!showInstructions}>
                <h3>How to find the playlist link:</h3>
                <ol>
                    <li>Go into Spotify and select the desired playlist.</li>
                    <li>Press the button for "Options" above where the tracks are listed - it should look like three dots</li>
                    <li>Press the "Share" option (or hover mouse over on computer)</li>
                    <li>Press "Copy link" (or "Copy link to playlist" on computer)</li>
                </ol>
                <p>You should now be able to paste this link into the input bar above.</p>

                <h3>How to make a playlist public:</h3>
                <ol>
                    <li>Go into Spotify and select the desired playlist</li>
                    <li>Press the button for "Options" above where the tracks are listed - it should look like three dots</li>
                    <li>
                        Press "Make public" - if this option is not available or says "Make private" instead, the playlist is already public
                    </li>
                </ol>
            </div>

        </div>
    )
}

export default Main;