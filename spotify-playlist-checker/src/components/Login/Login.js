import React from 'react';

const Login = () => {
    const handleLogin = () => {
        window.location.href = 'http://localhost:3001/login';
    }

    return (
        <div>
            <h2>Welcome to Spotify playlist checker</h2>
            <button onClick={handleLogin}>Login with Spotify</button>

        </div>
    );
};

export default Login;