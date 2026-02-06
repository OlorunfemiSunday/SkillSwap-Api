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

userSchema.pre("save", async function (next) {
  // only hash if password changed
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

/* ======================
   PASSWORD COMPARE
====================== */

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
