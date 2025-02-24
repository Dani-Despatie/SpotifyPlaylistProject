import GlobalStyles from './GlobalStyles';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Component Imports
import Main from './pages/Main';
import Callback from './pages/Callback';
import Footer from './components/Footer';
import Header from './components/Header';

const App = () => {
    return (
        <Router>
            <GlobalStyles/>
            <Header />

            <Routes>
                <Route path='/' element={<Main/>} />
                <Route path='/Callback' element={<Callback />} />
            </Routes>

            <Footer />

        </Router>
    )
}

export default App;