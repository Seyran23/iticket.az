const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public: Register a user
router.post("/register", registerUser);

// Public: Login a user
router.post("/login", loginUser);

// User: Get profile (protected)
router.get("/profile", protect, getUserProfile);

// User: Update profile (protected)
router.put("/profile", protect, updateUserProfile);

module.exports = router;
