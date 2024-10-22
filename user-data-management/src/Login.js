import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import the CSS file for styling

const Login = ({ setUser, setIsRegistering }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token); // Store the token
            setUser({ email }); // Set user state
            setMessage('Login successful!');
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    return (
        <div className="login-container">
            {/* Left side */}
            <div className="left-side">
                <h1 className="logo">COVERME.AI</h1>
                <div className="left-content">
                    <p className="tagline">Generate professional cover letters in seconds.</p>
                    <p className="subtext">Powered by AI. Tailored for you.</p>
                </div>
            </div>

            {/* Right side */}
            <div className="right-side">
                <div className="right-content">
                    <h2> Welcome User  </h2>
                    <form onSubmit={handleLogin} className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                id="email" 
                                type="email" 
                                placeholder="you@example.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                id="password" 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </div>
                        <button type="submit" className="submit-button">Log In</button>
                    </form>
                    {message && <p className="message">{message}</p>}
                    <p className="signup-text">
                        Don't have an account? <span className="register-link" onClick={() => setIsRegistering(true)}>Sign up</span>
                    </p>
                </div>
                <div className="contact-info">
                    <p>info@coverme.ai</p>
                    
                </div>
            </div>
        </div>
    );
};

export default Login;
