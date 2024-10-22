import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { generateCoverLetter } from '../services/ai-service.js';

const router = express.Router();

router.post('/cover-letter', authMiddleware, async (req, res) => {
    const { jobDescription, resumeContent } = req.body;
    try {
        console.log('Received request for cover letter generation');
        console.log('Job Description:', jobDescription);
        console.log('Resume Content:', resumeContent);
        const coverLetter = await generateCoverLetter(jobDescription, resumeContent);
        res.json({ coverLetter });
    } catch (error) {
        console.error('Error generating cover letter:', error);
        console.error('Error details:', error.response?.data);
        res.status(500).json({ 
            error: 'Failed to generate cover letter', 
            details: error.message,
            response: error.response?.data 
        });
    }
});

export default router;
