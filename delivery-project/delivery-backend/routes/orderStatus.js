const express = require("express");
const router = express.Router();
const Order = require("../models/order");

// POST: Create a new order
router.post("/", async (req, res) => {
  try {
    const { userId, name, email, cartItems, totalAmount, address } = req.body;

    const newOrder = new Order({
      userId,
      name,
      email,
      cartItems,
      totalAmount,
      address,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error("❌ Order creation failed:", error.message);
    res.status(500).json({ error: "Failed to place order" });
  }
});

// ✅ GET: Retrieve all orders (for admin dashboard)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("❌ Fetching orders failed:", error.message);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;
