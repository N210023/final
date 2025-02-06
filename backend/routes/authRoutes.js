const express = require("express");
const {
  getStudents,
  registerUser,
  candidateUser,
  emailver,
  verifyEmail,
  loginUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/emailver", emailver);
router.post("/verify-email",verifyEmail)
router.post("/candidate", candidateUser);
router.get("/students", getStudents);
router.post("/login",loginUser);

module.exports = router;
