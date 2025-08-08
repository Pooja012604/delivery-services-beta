const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Save a new order (accessible to authenticated users)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { customerName, address, paymentType, items, total } = req.body;

    if (!customerName || !address || !paymentType || !items || !total) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = new Order({
      customerName,
      address,
      paymentType,
      items,
      total,
    });

    await newOrder.save();
    res.status(201).json({ message: "✅ Order placed successfully" });
  } catch (error) {
    console.error("❌ Error placing order:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
});

// ✅ Get all orders (admin view)
router.get("/", authMiddleware, async (req, res) => {
  try {
    // Ensure only admins can access this
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ message: "Failed to load orders" });
  }
});

module.exports = router;
