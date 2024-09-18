import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Callback from './components/Callback/Callback';
import Playlist from './components/Playlist/FetchPlaylist';

const App = () => {
    return (
        <Router basename="https://ec2-18-222-149-241.us-east-2.compute.amazonaws.com">
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