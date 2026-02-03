const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect routes middleware
const protect = async (req, res, next) => {
  let token;

  try {
    // Check if authorization header exists
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request object, excluding password
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next(); // proceed to next middleware/route
    } else {
      return res.status(401).json({ message: "No token, not authorized" });
    }
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Token is invalid or expired" });
  }
};

module.exports = { protect };
