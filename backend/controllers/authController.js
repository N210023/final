const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Candidate = require("../models/Candidate"); // Fixed variable name
const { sendOtpEmail } = require("../utils/emailService");
const { JWT_SECRET } = require("../config");
const Emailver = require("../models/emailver");
// Generate and store OTP
exports.emailver = async (req, res) => {
  try {
    const { email } = req.body;

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Check if user exists
    let user = await Emailver.findOne({ email });

    if (!user) {
      // If user does not exist, create a new one
      user = new Emailver({ email, otp });
    } else {
      // If user exists, update OTP
      user.otp = otp;
      user.createdAt = new Date();
    }

    await user.save(); // Save the user record
    await sendOtpEmail(email, otp); // Send OTP via email
    console.log("OTP sent successfully");

    res
      .status(201)
      .json({ message: "OTP generated and sent successfully", otp });
  } catch (error) {
    console.error("Error storing OTP:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { name, idNo, branch, year, gender, email, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create new user
    const newUser = new User({
      name,
      idNo,
      branch,
      year,
      gender,
      email,
      password,
      isVoted: false,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Verify Email with OTP
exports.verifyEmail = async (req, res) => {
  try {
    console.log(req.body);
    const { email, otp } = req.body;

    const user = await Emailver.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP verification successful
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Email Verification Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Register Candidate
exports.candidateUser = async (req, res) => {
  try {
    const { name, idNo, branch, year, gender, email, password } = req.body;
    // Check if candidate already exists
    const existingUser = await Candidate.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Candidate already exists" });
    }

    // Create new candidate
    const newCandidate = new Candidate({
      name,
      idNo,
      branch,
      year,
      gender,
      email,
      password,
      voteCount: 0,
    });
    await newCandidate.save();

    res.status(201).json({ message: "Candidate registered successfully" });
  } catch (error) {
    console.error("Candidate Registration Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all students with selected fields
exports.getStudents = async (req, res) => {
  try {
    const students = await Candidate.find().select("name idNo year branch"); // Select only required fields
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Server error" });
  }
};
// User Login with Hashed Password Verification
exports.loginUser = async (req, res) => {
  try {
    console.log("Login request received");
    const { email, password } = req.body;
    console.log(req.body);
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      _id: user._id,
      token,
      name: user.name,
      isVoted: user.isVoted,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
