const Skill = require("../models/Skill");

const addSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create({
      ...req.body,
      owner: req.user.id
    });
    res.status(201).json(skill);
  } catch (err) {
    next(err);
  }
};

const getAllSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find().populate("owner");
    res.json(skills);
  } catch (err) {
    next(err);
  }
};

module.exports = { addSkill, getAllSkills };
