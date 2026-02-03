const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();

// ------------------------
// Public Routes
// ------------------------

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post("/login", login);

// ------------------------
// Protected Routes Example
// ------------------------
// const { protect } = require("../middleware/authMiddleware");
// router.get("/me", protect, getMe);

module.exports = router;
