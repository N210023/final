const User = require("../models/User");
const Candidate = require("../models/Candidate");

exports.castVote = async (req, res) => {
  try {
    const { userId, candidateId } = req.body;

    // Find user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if user has already voted
    if (user.isVoted) {
      return res.status(400).json({ message: "You already voted" });
    }

    // Find candidate by candidateId
    const candidate = await Candidate.findOne({ candidateId });
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    // Update user isVoted status
    user.isVoted = true;
    await user.save();

    // Increase candidate's voteCount
    candidate.voteCount += 1;
    await candidate.save();

    res.status(200).json({ message: "Vote cast successfully" });
  } catch (error) {
    console.error("Voting Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.allcandidates= async (req, res) => {
    try {
      const candidates = await Candidate.find(
        {}, // No filters, fetch all candidates
        "name idNo branch year voteCount" // Specify fields to retrieve
      );
  
      if (!candidates) {
        return res.status(404).json({ message: "No candidates found" });
      }
  
      res.status(200).json(candidates);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
