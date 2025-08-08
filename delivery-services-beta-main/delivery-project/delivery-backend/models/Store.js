const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  name: String,
  description: String,
  location: String,
  contactEmail: String,
  logoUrl: String,
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("Store", storeSchema);
