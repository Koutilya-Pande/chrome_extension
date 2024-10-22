import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import { Document, Packer, Paragraph, TextRun } from 'docx'; // Import docx classes
import axios from 'axios'; // Add this line if not already present
import Modal from './Modal'; // Import the Modal component

// Function to process the bold formatting in the cover letter
const processTextWithBold = (text) => {
	const parts = text.split(/(\*\*.*?\*\*)/); // Split by **bold** text
	return parts.map((part) => {
		if (part.startsWith("**") && part.endsWith("**")) {
			// It's bold text, so we return a bold TextRun
			return new TextRun({
				text: part.slice(2, -2), // Remove the ** characters
				bold: true,
				font: "Times New Roman",
				size: 24, // 12 points = 24 half-points
			});
		} else {
			// It's normal text, return a regular TextRun
			return new TextRun({
				text: part,
				font: "Times New Roman",
				size: 20, // 12 points = 24 half-points
			});
		}
	});
};

// Add this function at the top of your file, after the imports
const openProfilePage = () => {
	const token = localStorage.getItem('token');
	chrome.tabs.create({ url: `http://localhost:3000/profile?token=${token}` });
};

function Popup() {
	const [jobDescription, setJobDescription] = useState('');
	const [coverLetter, setCoverLetter] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [resumeContent, setResumeContent] = useState(''); // State to hold resume content
	const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

	// Log resumeContent whenever it changes
	useEffect(() => {
		console.log('Resume Content:', resumeContent);
	}, [resumeContent]);

	// Check if the user is already logged in when the component mounts
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			setIsLoggedIn(true);
			fetchResume(token); // Fetch resume if logged in
		}
	}, []);

	// Apply the appropriate class to the body
	useEffect(() => {
		document.body.className = isLoggedIn ? 'logged-in' : 'login';
	}, [isLoggedIn]);

	const fetchResume = async (token) => {
		console.log('Fetching resume with token:', token); // Log the token
		try {
			const response = await axios.get('http://localhost:5000/api/resume/my-resume', {
				headers: { Authorization: `Bearer ${token}` },
			});
			setResumeContent(response.data); // Set the resume content
		} catch (error) {
			console.error('Error fetching resume:', error);
			setMessage('Failed to fetch resume');
		}
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
			localStorage.setItem('token', response.data.token); // Store the token
			setIsLoggedIn(true);
			setMessage('Login successful!');
			fetchResume(response.data.token); // Fetch resume after successful login
		} catch (error) {
			setMessage(error.response.data.error || 'Login failed');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('Button clicked, job description:', jobDescription); // Debugging line
		setIsLoading(true);
		try {
			const token = localStorage.getItem('token');
			const response = await axios.post('http://localhost:5000/api/generate/cover-letter', 
				{ jobDescription, resumeContent },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			setCoverLetter(response.data.coverLetter);
		} catch (error) {
			console.error('Error generating cover letter:', error);
			setMessage('Failed to generate cover letter');
		} finally {
			setIsLoading(false);
		}
	};

	const handleDownload = () => {
		const doc = new Document({
			sections: [{
				properties: {
					top: 720,    // 0.75 inch
					bottom: 540, // 0.75 inch
					left: 720,   // 0.75 inch
					right: 720,  // 0.75 inch
				},
				children: coverLetter.split('\n').map((line) => {
					return new Paragraph({
						children: processTextWithBold(line), // Process bold text within the line
						spacing: {
							after: 20, // Add spacing after each paragraph (200 half-points = 10 points)
						},
					});
				}),
			}],
		});

		Packer.toBlob(doc).then((blob) => {
			const link = document.createElement('a');
			link.href = URL.createObjectURL(blob);
			link.download = 'cover_letter.docx'; // Set the file name to .docx
			link.click();
		});
	};

	const handleLogout = () => {
		localStorage.removeItem('token'); // Remove the token
		setIsLoggedIn(false); // Update login state
		setResumeContent(''); // Clear resume content
		setEmail(''); // Clear email input
		setPassword(''); // Clear password input
		setMessage('Logged out successfully!'); // Optional message
	};



	return (
		<div className="popup">
			<div className="header">
				<h1>coverme.ai</h1>
				{isLoggedIn && (
					<div className="header-buttons">
						<a href="#" className="profile-link" onClick={openProfilePage}>
							Profile
						</a>
						<button className="logout-button" onClick={handleLogout}>Logout</button>
					</div>
				)}
			</div>
			{!isLoggedIn ? (
				<form onSubmit={handleLogin}>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						required
					/>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						required
					/>
					<button type="submit">Login</button>
					{message && <p>{message}</p>}
				</form>
			) : (
				<>
					<form onSubmit={handleSubmit}>
						{/* Add the Job Description heading here */}
						<h3 className="job-description-heading">Job Description</h3>
						<textarea
							className="job-description-textarea" // Add this class
							value={jobDescription}
							onChange={(e) => setJobDescription(e.target.value)}
							placeholder="Paste job description here"
							required
						/>
						<button type="submit" disabled={isLoading}>
							{isLoading ? 'Generating...' : 'Generate Cover Letter'}
						</button>
					</form>
					{coverLetter && (
						<>
							<h3 className="job-description-heading">Generated Cover Letter:</h3> {/* Move this outside the box */}
							<div className="cover-letter">
								<pre>{coverLetter}</pre>
							</div>
							<button className="download-button" onClick={handleDownload}>Download Cover Letter</button>
							<button className="download-button" onClick={() => setIsModalOpen(true)}>Expand</button> {/* Expand button */}
						</>
					)}
				</>
			)}
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onDownload={handleDownload}>
				<h3>Generated Cover Letter</h3>
				<pre>{coverLetter}</pre> {/* Display the cover letter in the modal */}
			</Modal>
		</div>
	);
}

// Use createRoot instead of ReactDOM.render
const root = createRoot(document.getElementById('root'));
root.render(<Popup />);