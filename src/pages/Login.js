import GlobalStyles from '../GlobalStyles';
import React from 'react';

// Component Imports
import StandardButton from '../components/StandardButton';

// Script Imports
import getAuthorizationCode from '../spotify-scripts/getAuthorizationCode';

function Login() {
    return (
        <div>
            <p>Welcome to the login page</p>

            <StandardButton onClick={getAuthorizationCode}>Log In to Spotify</StandardButton>
        </div>
    )
}

export default Login;