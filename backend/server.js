const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const signup = require("./routes/authRoutes");
const voting = require("./routes/voteRoutes");

// Load environment variables
dotenv.config();

// MongoDB connection
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected successfully");
})
.catch((err) => {
  console.error("❌ MongoDB Connection Failed:", err.message);
});

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/vote", voting);
app.use("/api/auth", signup);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
