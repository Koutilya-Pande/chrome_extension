import React, { useState } from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import { generateCoverLetter } from '../lib/ai-service'; // Adjusted path
import { Document, Packer, Paragraph, TextRun } from 'docx'; // Import docx classes

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

function Popup() {
	const [jobDescription, setJobDescription] = useState('');
	const [coverLetter, setCoverLetter] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('Button clicked, job description:', jobDescription); // Debugging line
		setIsLoading(true);
		try {
			const generatedLetter = await generateCoverLetter(jobDescription);
			setCoverLetter(generatedLetter);
		} catch (error) {
			console.error('Error generating cover letter:', error);
			alert('Failed to generate cover letter. Please try again.');
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

	return (
		<div className="popup">
			<h1>AI Cover Letter Generator</h1>
			<form onSubmit={handleSubmit}>
				<textarea
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
				<div className="cover-letter">
					<h3>Generated Cover Letter:</h3>
					<pre>{coverLetter}</pre>
					<button onClick={handleDownload}>Download Cover Letter</button>
				</div>
			)}
		</div>
	);
}

// Use createRoot instead of ReactDOM.render
const root = createRoot(document.getElementById('root'));
root.render(<Popup />);
