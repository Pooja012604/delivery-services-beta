const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("storeId", "name");
    res.json(products);
  } catch (error) {
    console.error("❌ Error loading products:", error);
    res.status(500).json({ error: "Failed to load products" });
  }
});

module.exports = router;
