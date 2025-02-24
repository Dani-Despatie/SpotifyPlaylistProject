import React from 'react';

// Component Imports
import getAccessToken from '../spotify-scripts/getAccessToken';

function Main() {
    getAccessToken();
    return (
        <div className='container'>
            <p>Loading...</p>
        </div>
    )
}

export default Main;