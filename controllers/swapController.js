const Swap = require("../models/Swap");

const createSwap = async (req, res, next) => {
  try {
    const swap = await Swap.create({
      ...req.body,
      requester: req.user.id
    });
    res.status(201).json(swap);
  } catch (err) {
    next(err);
  }
};

const getSwaps = async (req, res, next) => {
  try {
    const swaps = await Swap.find().populate("requester provider skillRequested skillProvided");
    res.json(swaps);
  } catch (err) {
    next(err);
  }
};

const updateSwap = async (req, res, next) => {
  try {
    const { id } = req.params;
    const swap = await Swap.findByIdAndUpdate(id, req.body, { new: true });
    res.json(swap);
  } catch (err) {
    next(err);
  }
};

module.exports = { createSwap, getSwaps, updateSwap };
