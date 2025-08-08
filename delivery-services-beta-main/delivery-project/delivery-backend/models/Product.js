const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
  imageUrl: String,
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
  category: {
    type: String,
    enum: ["Sweets", "Spices", "Pickles", "Clothes", "Jewelry", "Decorations"],
  },
});

module.exports = mongoose.model("Product", productSchema);
