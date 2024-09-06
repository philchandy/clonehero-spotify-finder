import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Callback from './components/Callback/Callback';
import Playlist from './components/Playlist/FetchPlaylist';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/callback" element={<Callback />} />
                <Route path="/playlist" element={<Playlist />} />
                <Route path="/" element={<Login />} /> {/* Default route to login */}
            </Routes>
        </Router>
    );
};

export default App;