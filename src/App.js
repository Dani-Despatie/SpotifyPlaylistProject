import GlobalStyles from './GlobalStyles';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Component Imports
import Login from './pages/Login';
import Main from './pages/Main';

const App = () => {
    return (
        <Router>
            <GlobalStyles/>

            <Routes>
                <Route path='/' element={<Login/>} />
                <Route path='/Callback' element={<Main />} />
            </Routes>

        </Router>
    )
}

export default App;