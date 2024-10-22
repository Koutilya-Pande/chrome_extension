import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Import the CSS file for styling

const Register = ({ setUser, setIsRegistering }) => { // Add setIsRegistering as a prop
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { email, password });
            setMessage(response.data.message); // Ensure response.data is defined
        } catch (error) {
            // Check if error.response exists and handle accordingly
            if (error.response) {
                setMessage(error.response.data.error || 'An error occurred during registration.');
            } else {
                setMessage('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="register-container">
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
                    <h2>Create Account</h2>
                    <form onSubmit={handleRegister} className="register-form">
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
                        <button type="submit" className="submit-button">Register</button>
                    </form>
                    {message && <p className="message">{message}</p>}
                    <p className="login-text">
                        Already have an account? <span className="login-link" onClick={() => setIsRegistering(false)}>Log in</span>
                    </p>
                </div>
                <div className="contact-info">
                    <p>info@coverme.ai</p>
                    
                </div>
            </div>
        </div>
    );
};

export default Register;
