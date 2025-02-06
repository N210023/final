const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const CandidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  idNo: { type: String, required: true, unique: true },
  branch: { type: String, required: true },
  year: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  voteCount: { type: Number, default: 0 }, // Added voteCount field
});

// Hash password before saving
CandidateSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("Candidate", CandidateSchema);
