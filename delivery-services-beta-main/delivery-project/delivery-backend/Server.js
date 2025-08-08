const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Existing routes
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/orders");
const wishlistRoutes = require("./routes/wishlist");

// ✅ New routes we're adding
const productRoutes = require("./routes/products");
const storeRoutes = require("./routes/stores");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api", authRoutes);             // login/register
app.use("/api/orders", orderRoutes);     // orders & admin
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/products", productRoutes); // ✅ new
app.use("/api/stores", storeRoutes);     // ✅ new

// Root test route
app.get("/", (req, res) => {
  res.send("🚀 Delivery Services API is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
