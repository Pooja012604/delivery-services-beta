const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: String,
  address: String,
  paymentType: {
    type: String,
    enum: ["Card", "UPI", "Cash on Delivery"],
  },
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
      store: String,
    },
  ],
  total: Number,
  status: {
    type: String,
    enum: ["Pending", "Packed", "Shipped", "Delivered"],
    default: "Pending",
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
