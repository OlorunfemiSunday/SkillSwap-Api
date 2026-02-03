const User = require("../models/User");

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("skills");
    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { getProfile };
