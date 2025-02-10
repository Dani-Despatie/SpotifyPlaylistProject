import React from 'react';

// Component Imports
import StandardButton from '../components/StandardButton';
import callback from '../spotify-scripts/callback';

function Main() {
    callback();
    return (
        <div>
            <p>Loading... Please wait</p>
        </div>
    )
}

export default Main;