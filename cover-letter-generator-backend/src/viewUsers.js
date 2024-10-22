import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');

        // Define User model
        const User = mongoose.model('User', new mongoose.Schema({
            email: String,
            password: String,
        }));

        // Define Resume model
        const Resume = mongoose.model('Resume', new mongoose.Schema({
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            fullName: String,
            email: String,
            phoneNumber: String,
            education: String,
            experience: String,
            skills: [String],
            certifications: String,
            createdAt: {
                type: Date,
                default: Date.now,
            },
        }));

        // Fetch users
        const users = await User.find();
        console.log('Users:', users);

        // Fetch resumes associated with each user
        for (const user of users) {
            const resumes = await Resume.find({ userId: user._id });
            console.log(`Resumes for user ${user.email}:`, resumes);
        }

        mongoose.connection.close();
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

connectDB();
