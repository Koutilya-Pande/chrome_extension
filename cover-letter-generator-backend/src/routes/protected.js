import express from 'express';
import { authMiddleware } from '../middleware/auth.js'; // Import your auth middleware

const router = express.Router();

// Protected route example
router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

export default router; // Ensure you have this line to export the router
