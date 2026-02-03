const express = require("express");
const { register, login, verifyEmail } = require("../controllers/authController");
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

// @route   GET /api/auth/verify/:token
// @desc    Verify user email
// @access  Public
router.get("/verify/:token", verifyEmail);

// ------------------------
// Protected Routes Example
// ------------------------
// const { protect } = require("../middleware/authMiddleware");
// router.get("/me", protect, getMe);

module.exports = router;
