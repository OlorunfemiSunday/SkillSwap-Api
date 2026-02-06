const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    /* ======================
       PROFILE INFO
    ====================== */

    gender: {
      type: String,
      default: "",
      trim: true,
    },

    bio: {
      type: String,
      default: "",
      trim: true,
    },

    role: {
      type: String,
      default: "",
      trim: true,
    },

    industry: {
      type: String,
      default: "",
      trim: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    // Always returns [] instead of undefined
    skills: {
      type: [String],
      default: [],
    },

    // Always returns object instead of undefined
    socialLinks: {
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
      portfolio: { type: String, default: "" },
    },

    /* ======================
       AUTH INFO
    ====================== */

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // 🔥 security improvement (password not returned by default)
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: String,
  },
  { timestamps: true },
);

/* ======================
   HASH PASSWORD
====================== */

// Fixed: Removed 'next' parameter and calls to fix "next is not a function" error
userSchema.pre("save", async function () {
  // only hash if password changed
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/* ======================
   PASSWORD COMPARE
====================== */

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
