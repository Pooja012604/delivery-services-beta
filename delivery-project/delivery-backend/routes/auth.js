const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Order = require("../models/order");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ POST /api/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;

    if (!name || !email || !phone || !address || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ POST /api/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET /api/checkout (Protected)
router.get("/checkout", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to checkout!",
    user: req.user
  });
});

// ✅ POST /api/checkout (Save Order)
router.post("/checkout", authMiddleware, async (req, res) => {
  try {
    const { items, totalAmount, deliveryAddress } = req.body;

    if (!items || !totalAmount || !deliveryAddress) {
      return res.status(400).json({ message: "Missing order details" });
    }

    const newOrder = new Order({
      userId: req.user.userId,
      items,
      totalAmount,
      deliveryAddress
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", orderId: newOrder._id });

  } catch (err) {
    console.error("Order error:", err.message);
    res.status(500).json({ message: "Server error placing order" });
  }
});

// ✅ GET /api/my-orders (Fetch all user orders)
router.get("/my-orders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId }).sort({ orderedAt: -1 });
    res.json({ orders });
  } catch (err) {
    console.error("Order fetch error:", err.message);
    res.status(500).json({ message: "Server error fetching orders" });
  }
});

module.exports = router;
