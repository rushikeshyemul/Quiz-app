import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import quizRoutes from './routes/quiz.js';

dotenv.config(); // ✅ Make sure this stays at the top

// Use local MongoDB if no environment variable is set
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/quiz-app';
// Set default JWT_SECRET if not provided
process.env.JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';
console.log("MONGO_URI is:", MONGO_URI); // ✅ Debug line

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI).then(() => {
  console.log("MongoDB connected!");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);

app.get('/', (req, res) => {
  res.send("Quiz API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
