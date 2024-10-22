import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './LandingPage.tsx';  // Note the .tsx extension
import Login from './Login';
import Register from './Register';
import Profile from './Profile'; // Import the Profile component
import axios from 'axios';

const App = () => {
    const [user, setUser] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false);

    useEffect(() => {
        const verifyToken = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const urlToken = urlParams.get('token');
            const storedToken = localStorage.getItem('token');
            const token = urlToken || storedToken;

            if (token) {
                console.log('Token found:', token);
                localStorage.setItem('token', token);
                await fetchUserData(token);
            } else {
                console.log('No token found');
                setUser(null);
            }
        };

        verifyToken();
    }, []);

    const fetchUserData = async (token) => {
        console.log('Fetching user data with token:', token);
        try {
            const response = await axios.get('http://localhost:5000/api/auth/user', {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('User data received:', response.data);
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUser(null);
        }
    };

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={
                        !user ? (
                            isRegistering ? (
                                <Register setUser={setUser} setIsRegistering={setIsRegistering} />
                            ) : (
                                <Login setUser={setUser} setIsRegistering={setIsRegistering} />
                            )
                        ) : (
                            <Navigate to="/profile" replace />
                        )
                    } />
                    <Route path="/profile" element={
                        user === null ? <Navigate to="/login" replace /> :
                        user ? <Profile user={user} setUser={setUser} /> :
                        <div>Loading...</div>
                    } />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
