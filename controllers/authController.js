const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// REGISTER
const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      name,
      email,
      phone,
      password,
      verificationToken,
    });

    // Send success response immediately
    res.status(201).json({
      message: "Registration successful! Please check your email to verify your account.",
    });

    // Send email in background
    try {
      const verificationUrl = `https://skillswap-api-1upf.onrender.com/api/auth/verify/${verificationToken}`;
      const message = `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #172554;">Verify Your Email</h2>
          <p>Hello ${name},</p>
          <p>Thank you for signing up for Skill Swap! Please click the button below to verify your account.</p>
          <a href="${verificationUrl}" style="display: inline-block; background: #172554; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Verify Email</a>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
        </div>
      `;

      await sendEmail(user.email, "Verify your Skill Swap Account", message);
      console.log("Verification email sent successfully to:", user.email);
    } catch (emailErr) {
      console.error("EMAIL SENDING FAILED:", emailErr.message);
    }

  } catch (err) {
    console.error("REGISTRATION ERROR:", err);
    if (!res.headersSent) {
      res.status(500).json({ message: "Server error" });
    }
  }
};

// VERIFY EMAIL
const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });

    if (!user) {
      return res.status(400).send("<h1>Invalid or expired link</h1>");
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.send(`
      <div style="text-align: center; margin-top: 50px; font-family: sans-serif;">
        <h1 style="color: #172554;">Email Verified!</h1>
        <p>Your account has been successfully verified. You can now log in.</p>
      </div>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error during verification");
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        message: "Please verify your email address before logging in.",
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login, verifyEmail };
