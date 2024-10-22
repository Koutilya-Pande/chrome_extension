import React, { useState, useEffect } from 'react';
import './Profile.css'; // Import the CSS file for styling
import axios from 'axios';
import { Pencil, Plus, Briefcase, GraduationCap, Code, Award, User, Linkedin, Github, Mail, Phone } from 'lucide-react'; // Import additional icons

const Profile = ({ user, setUser }) => {
    const [editingSection, setEditingSection] = useState(null); // Track which section is being edited
    const [profileData, setProfileData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        education: '',
        experience: '',
        projects: '',
        skills: '',
        certifications: '',
        linkedin: '',
        github: '',
        personalWebsite: '' // Placeholder for the personal website
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:5000/api/resume/my-resume', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProfileData(response.data); // Ensure this updates the state correctly
        } catch (error) {
            console.error('Error fetching profile:', error);
            setMessage('Failed to load profile data');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:5000/api/resume/save-resume', profileData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage('Profile updated successfully'); // Set success message
            setEditingSection(null); // Close the editing mode after saving
            fetchUserProfile(); // Fetch updated profile data
        } catch (error) {
            setMessage(error.response?.data?.error || 'An error occurred while updating the profile');
        }
    };

    const renderUserInfo = () => (
        <div className="card user-info">
            <div className="card-header">
                <h3 className="card-title">Personal Info</h3>
                <button className="icon-button" onClick={() => setEditingSection(editingSection === 'userInfo' ? null : 'userInfo')}>
                    {editingSection === 'userInfo' ? <Plus size={20} /> : <Pencil size={20} />}
                </button>
            </div>
            <div className="card-content">
                {editingSection === 'userInfo' ? (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="fullName"
                            value={profileData.fullName}
                            onChange={handleInputChange}
                            placeholder="Full Name"
                            className="profile-input"
                        />
                        <button type="submit" className="submit-button">Save</button> {/* Ensure this is a submit button */}
                    </form>
                ) : (
                    <>
                        <div className="profile-picture">
                            <span>{profileData.fullName?.charAt(0)}</span>
                        </div>
                        <h2>{profileData.fullName}</h2>
                    </>
                )}
            </div>
        </div>
    );

    const renderField = (label, name, icon, isMultiline = false) => (
        <div className="card">
            <div className="card-header">
                <div className="card-title-icon">
                    {icon && React.cloneElement(icon, { size: 20 })}
                    <h3 className="card-title">{label}</h3>
                </div>
                <button className="icon-button" onClick={() => setEditingSection(editingSection === name ? null : name)}>
                    {editingSection === name ? <Plus size={20} /> : <Pencil size={20} />}
                </button>
            </div>
            <div className="card-content">
                {editingSection === name ? (
                    <>
                        {name === 'contact' ? (
                            <div className="contact-inputs">
                                <div className="input-group">
                                    <Mail size={16} />
                                    <input
                                        type="email"
                                        name="email"
                                        value={profileData.email}
                                        onChange={handleInputChange}
                                        placeholder="Email"
                                        className="profile-input"
                                    />
                                </div>
                                <div className="input-group">
                                    <Phone size={16} />
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={profileData.phoneNumber}
                                        onChange={handleInputChange}
                                        placeholder="Phone Number"
                                        className="profile-input"
                                    />
                                </div>
                            </div>
                        ) : name === 'portfolio' ? (
                            <div className="portfolio-inputs">
                                <div className="input-group">
                                    <Linkedin size={16} />
                                    <input
                                        type="url"
                                        name="linkedin"
                                        value={profileData.linkedin}
                                        onChange={handleInputChange}
                                        placeholder="LinkedIn URL"
                                        className="profile-input"
                                    />
                                </div>
                                <div className="input-group">
                                    <Github size={16} />
                                    <input
                                        type="url"
                                        name="github"
                                        value={profileData.github}
                                        onChange={handleInputChange}
                                        placeholder="GitHub URL"
                                        className="profile-input"
                                    />
                                </div>
                                <div className="input-group">
                                    <User size={16} />
                                    <input
                                        type="url"
                                        name="personalWebsite"
                                        value={profileData.personalWebsite}
                                        onChange={handleInputChange}
                                        placeholder="Personal Website URL"
                                        className="profile-input"
                                    />
                                </div>
                            </div>
                        ) : (
                            isMultiline ? (
                                <textarea
                                    name={name}
                                    value={profileData[name]}
                                    onChange={handleInputChange}
                                    className="profile-input"
                                />
                            ) : (
                                <input
                                    type="text"
                                    name={name}
                                    value={profileData[name]}
                                    onChange={handleInputChange}
                                    className="profile-input"
                                />
                            )
                        )}
                        <button type="button" onClick={handleSubmit} className="submit-button">Save</button>
                    </>
                ) : (
                    <div className="field-content">
                        {name === 'contact' ? (
                            <>
                                <div className="input-group">
                                    <Mail size={16} />
                                    <span>{profileData.email || 'No email added'}</span>
                                </div>
                                <div className="input-group">
                                    <Phone size={16} />
                                    <span>{profileData.phoneNumber || 'No phone number added'}</span>
                                </div>
                            </>
                        ) : name === 'portfolio' ? (
                            <>
                                <div className="input-group">
                                    <Linkedin size={16} />
                                    <span>{profileData.linkedin || 'No LinkedIn URL added'}</span>
                                </div>
                                <div className="input-group">
                                    <Github size={16} />
                                    <span>{profileData.github || 'No GitHub URL added'}</span>
                                </div>
                                <div className="input-group">
                                    <User size={16} />
                                    <span>{profileData.personalWebsite || 'No Personal Website URL added'}</span>
                                </div>
                            </>
                        ) : (
                            <div className="input-group">
                                <span>{profileData[name] || `No ${label.toLowerCase()} added`}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from local storage
        setUser(null); // Reset the user state
        window.location.href = '/'; // Redirect to the login page
    };

    return (
        <div className="profile-container">
            <header className="profile-header">
                <div className="header-content">
                    <div className="logo">
                        <svg className="logo-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="logo-text">CoverMe.AI</span>
                    </div>
                    <nav className="header-nav">
                        <a href="#" className="nav-link active">Profile</a>
                        <button className="nav-link logout-button" onClick={handleLogout}>Logout</button>
                    </nav>
                </div>
            </header>

            <main className="profile-main">
                <div className="profile-content">
                    <div className="left-column">
                        {renderUserInfo()}
                        {renderField('Contact', 'contact', <Mail />, false)} {/* Call renderField for contact */}
                        {renderField('Portfolio', 'portfolio', <Linkedin />, false)} {/* Call renderField for portfolio */}
                    </div>
                    <div className="right-column">
                        {renderField('Work Experience', 'experience', <Briefcase />, true)}
                        {renderField('Skills', 'skills', null)}
                        {renderField('Projects', 'projects', <Code />, true)}
                        {renderField('Education', 'education', <GraduationCap />, true)}
                        {renderField('Certifications', 'certifications', <Award />, true)}
                    </div>
                </div>
            </main>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Profile;