import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import quizRoutes from "./routes/quiz.js";

dotenv.config(); // ✅ Must be at the very top

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// -------------------------------
// Environment Variables
// -------------------------------
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/quiz-app";
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-here";

// Optional: log Mongo URI without password for debugging
console.log(
  "Connecting to MongoDB at:",
  MONGO_URI.replace(/:(.*)@/, ":*****@")
);

// -------------------------------
// MongoDB Connection
// -------------------------------
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit if DB connection fails
  });

// -------------------------------
// Routes
// -------------------------------
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);

app.get("/", (req, res) => {
  res.send("Quiz API is running");
});

// -------------------------------
// Start Server
// -------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
