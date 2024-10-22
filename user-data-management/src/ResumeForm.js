import React, { useState } from 'react';
import axios from 'axios';

const ResumeForm = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [education, setEducation] = useState('');
    const [experience, setExperience] = useState('');
    const [skills, setSkills] = useState('');
    const [certifications, setCertifications] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:5000/api/resume/save-resume', {
                fullName,
                email,
                phoneNumber,
                education,
                experience,
                skills: skills.split(','),
                certifications,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    return (
        <div>
            <h2>Enter Your Resume</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone Number"
                    required
                />
                <input
                    type="text"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    placeholder="Education"
                    required
                />
                <input
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="Experience"
                    required
                />
                <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="Skills (comma separated)"
                    required
                />
                <input
                    type="text"
                    value={certifications}
                    onChange={(e) => setCertifications(e.target.value)}
                    placeholder="Certifications"
                />
                <button type="submit">Save Resume</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResumeForm;
