const express = require("express");
const router = express.Router();
const Count = require("../models/count");
const mongoose = require("mongoose");

router.get("/test", async (req, res) => {
  res.send("This is a test");
});

router.get("/", async (req, res) => {
  try {
    const counts = await Count.find();
    res.status(200).json(counts);
  } catch (err) {
    res.status(400).json({
      message: "Nothing to see here",
    });
  }
});

router.post("/create", async (req, res) => {
  try {
    const counts = await Count.create({ number: 0 });
    if (counts) {
      res.status(200).json(counts);
    }
  } catch (err) {
    res.status(400).json({
      message: "Nothing to see here",
    });
  }
});

router.post("/increment/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid ID",
    });
  }

  try {
    const increment = await Count.findByIdAndUpdate(
      { _id: id },
      { $inc: { number: 1 } },
      { new: true }
    );
    if (increment) {
      res.status(200);
    }
  } catch (err) {
    res.status(400).json({
      message: "Nothing to see here",
    });
  }
});

router.post("/decrement/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid ID",
    });
  }

  try {
    const increment = await Count.findByIdAndUpdate(
      { _id: id },
      { $inc: { number: -1 } },
      { new: true }
    );
    if (increment) {
      res.status(200);
    }
  } catch (err) {
    res.status(400).json({
      message: "Nothing to see here",
    });
  }
});

router.post("/reset/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid ID",
    });
  }

  try {
    const increment = await Count.findByIdAndUpdate(
      { _id: id },
      { number: 0 },
      { new: true }
    );
    if (increment) {
      res.status(200);
    }
  } catch (err) {
    res.status(400).json({
      message: "Nothing to see here",
    });
  }
});

module.exports = router;
