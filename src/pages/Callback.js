import React from 'react';

// Component Imports
import StandardButton from '../components/StandardButton';
import getAccessToken from '../spotify-scripts/getAccessToken';

function Main() {
    getAccessToken();
    return (
        <div>
            <p>Loading...</p>
        </div>
    )
}

export default Main;