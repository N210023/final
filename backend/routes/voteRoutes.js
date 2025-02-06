const express = require("express");
const { castVote, allcandidates } = require("../controllers/voteController");

const router = express.Router();

router.post("/castvote", castVote);
router.get("/candidates", allcandidates);

module.exports = router;
