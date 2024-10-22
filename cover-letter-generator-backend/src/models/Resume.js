import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // References the User model
        ref: 'User',
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    phoneNumber: {
        type: String,
        required: false,
    },
    education: {
        type: String,
        required: false, // Changed to false
    },
    experience: {
        type: String,
        required: false, // Changed to false
    },
    projects: {
        type: String,
        required: false,
    },
    skills: {
        type: [String], // Array of skills
        required: false, // Changed to false
    },
    certifications: {
        type: String,
        required: false,
    },
    linkedin: { 
        type: String,
         required: false }, // Added field
    github: { 
        type: String, 
        required: false }, // Added field
    personalWebsite: {
         type: String, 
         required: false },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Resume = mongoose.model('Resume', ResumeSchema);
export default Resume;
