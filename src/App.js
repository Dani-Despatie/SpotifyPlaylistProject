import GlobalStyles from './GlobalStyles';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Component Imports
import Main from './pages/Main';
import Callback from './pages/Callback';
import ConsoleLogView from './components/ConsoleLogView';


const App = () => {
    return (
        <Router>
            <GlobalStyles/>

            <Routes>
                <Route path='/' element={<Main/>} />
                <Route path='/Callback' element={<Callback />} />
            </Routes>

        </Router>
    )
}

export default App;