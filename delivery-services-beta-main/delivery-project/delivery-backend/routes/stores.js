const express = require("express");
const router = express.Router();
const Store = require("../models/Store");

router.get("/", async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (error) {
    console.error("❌ Error loading stores:", error);
    res.status(500).json({ error: "Failed to load stores" });
  }
});

module.exports = router;
