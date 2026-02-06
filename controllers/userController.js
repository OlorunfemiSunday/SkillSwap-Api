const User = require("../models/User");

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const {
      name,
      email,
      phone,
      gender,
      bio,
      role,
      industry,
      location,
      skills,
      linkedin,
      twitter,
      instagram,
      portfolio,
    } = req.body;

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.gender = gender;
    user.bio = bio;
    user.role = role;
    user.industry = industry;
    user.location = location;
    user.skills = skills;

    user.socialLinks = {
      linkedin,
      twitter,
      instagram,
      portfolio,
    };

    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { updateProfile };
