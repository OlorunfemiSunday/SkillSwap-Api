const express = require("express");
const {
  addSkill,
  getAllSkills
} = require("../controllers/skillController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, addSkill);
router.get("/", getAllSkills);

module.exports = router;
