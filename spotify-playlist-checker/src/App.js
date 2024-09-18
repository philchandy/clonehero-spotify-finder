import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Callback from './components/Callback/Callback';
import Playlist from './components/Playlist/FetchPlaylist';
import apiBaseUrl from './components/ApiConfig';

const App = () => {
    return (
        <Router basename= {`${apiBaseUrl}`}>
            <Routes>
                <Route path="/" element={<Login />} /> {/* Default route to login */}
                <Route path="/login" element={<Login />} />
                <Route path="/callback" element={<Callback />} />
                <Route path="/playlist" element={<Playlist />} />
                
            </Routes>
        </Router>
    );
};

export default App;