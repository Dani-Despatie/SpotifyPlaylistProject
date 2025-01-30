import GlobalStyles from './GlobalStyles';
import React from 'react';

// Component Imports
import getTracklist from './spotify-scripts/getTracklist';
import getAccessToken from './spotify-scripts/getAccessToken';
import StandardButton from './components/StandardButton';

const App = () => {
    return (
        <div>
            <GlobalStyles/>
            <p>Hello world</p>

            <StandardButton onClick={getTracklist}>Get Track List</StandardButton>
            <StandardButton onClick={getAccessToken}>Get Access Token</StandardButton>
            
        </div>
    )
}

export default App;