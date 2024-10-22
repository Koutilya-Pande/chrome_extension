import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import protectedRoutes from './routes/protected.js'; // This should match the export in protected.js
import resumeRoutes from './routes/resume.js'; // Import the new resume routes
import generateRoutes from './routes/generate.js'; // Add this line

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes); // Use the protected routes
app.use('/api/resume', resumeRoutes); // Resume routes
app.use('/api/generate', generateRoutes); // Add this line

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
