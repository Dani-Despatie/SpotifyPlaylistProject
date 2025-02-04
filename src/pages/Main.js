import GlobalStyles from '../GlobalStyles';
import React from 'react';

// Component Imports
import StandardButton from '../components/StandardButton';

// Script Imports
import getAccessToken from '../spotify-scripts/getAccessToken';

function Main() {
    return (
        <div>
            <p>Welcome to the Main page</p>

            <StandardButton onClick={getAccessToken}>Get Access Token</StandardButton>

        </div>
    )
}

export default Main;