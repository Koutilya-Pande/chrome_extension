import express from 'express';
import { authMiddleware } from '../middleware/auth.js'; // Ensure the user is authenticated
import Resume from '../models/Resume.js';

const router = express.Router();

// Route to create or update a resume
router.post('/save-resume', authMiddleware, async (req, res) => {
    const { fullName, email, phoneNumber, education, experience, projects, skills, certifications, linkedin, github, personalWebsite } = req.body;

    try {
        // Check if a resume already exists for the user
        let resume = await Resume.findOne({ userId: req.user.id });

        if (resume) {
            // Update existing resume
            resume.fullName = fullName;
            resume.email = email;
            resume.phoneNumber = phoneNumber;
            resume.education = education;
            resume.experience = experience;
            resume.projects = projects;
            resume.skills = skills;
            resume.certifications = certifications;
            resume.linkedin = linkedin; // Update linkedin
            resume.github = github; // Update github
            resume.personalWebsite = personalWebsite; // Update personalWebsite
            await resume.save();
            return res.json({ message: 'Resume updated successfully', resume });
        }

        // Create a new resume
        const newResume = new Resume({
            userId: req.user.id,
            fullName,
            email,
            phoneNumber,
            education,
            experience,
            projects,
            skills,
            certifications,
            linkedin, // Add linkedin
            github, // Add github
            personalWebsite // Add personalWebsite
        });

        await newResume.save();
        res.status(201).json({ message: 'Resume saved successfully', resume: newResume });
    } catch (error) {
        console.error('Error saving resume:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to get a user's resume
router.get('/my-resume', authMiddleware, async (req, res) => {
    try {
        const resume = await Resume.findOne({ userId: req.user.id });
        if (!resume) {
            return res.status(404).json({ error: 'Resume not found' });
        }
        res.json(resume);
    } catch (error) {
        console.error('Error retrieving resume:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
