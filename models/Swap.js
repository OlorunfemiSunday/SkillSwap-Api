const mongoose = require("mongoose");

const swapSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  skillRequested: { type: mongoose.Schema.Types.ObjectId, ref: "Skill" },
  skillProvided: { type: mongoose.Schema.Types.ObjectId, ref: "Skill" },
  status: { type: String, default: "pending" }
});

module.exports = mongoose.model("Swap", swapSchema);
