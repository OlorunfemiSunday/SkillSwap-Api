const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// REGISTER
const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Validate input
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Generate Verification Token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password,
      verificationToken,
    });

    // Send the response IMMEDIATELY so Postman doesn't hang
    res.status(201).json({
      message: "Registration successful! Please check your email to verify your account.",
    });

    // Handle email sending in the background (remove 'await' or keep it inside this separate block)
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

      // We still await here, but since the response was already sent above, 
      // the user doesn't have to wait for the SMTP server to respond.
      await sendEmail(user.email, "Verify your Skill Swap Account", message);
      console.log("Verification email sent successfully to:", user.email);
    } catch (emailErr) {
      console.error("EMAIL SENDING FAILED:", emailErr.message);
      // We don't need to send a res.status here because it was already sent above
    }

  } catch (err) {
    console.error("REGISTRATION ERROR:", err);
    // Only send error if the response hasn't been sent yet
    if (!res.headersSent) {
      res.status(500).json({ message: "Server error" });
    }
  }
};


module.exports = { register, login, verifyEmail };
