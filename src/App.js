import GlobalStyles from './GlobalStyles';
import React from 'react';

// Component Imports
import getTracklist from './spotify-scripts/getTracklist';
import StandardButton from './components/StandardButton';
import { generateRandomString, generateCodeChallenge } from './spotify-scripts/codeChallengeVerifier'

const App = () => {
    return (
        <div>
            <GlobalStyles/>
            <p>Hello world</p>

            <StandardButton onClick={getTracklist}>Get Track List</StandardButton>
            
        </div>
    )
}

export default App;