const express = require("express");
const router = express.Router();
const Property = require("../models/Property");

// 👉 GET all properties
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// 👉 POST create new property
router.post("/", async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (err) {
    res.status(400).json({ error: "Failed to create property" });
  }
});

module.exports = router;
