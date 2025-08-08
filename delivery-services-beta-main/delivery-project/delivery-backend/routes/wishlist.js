const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticateToken = require('../middleware/authMiddleware');

// ✅ GET Wishlist
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.wishlist || []);
  } catch (err) {
    console.error('❌ Error fetching wishlist:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ POST Add to Wishlist
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { item } = req.body;
    console.log("📥 Wishlist item received:", item);

    if (!item || !item.name) {
      return res.status(400).json({ error: 'Invalid item data' });
    }

    const user = await User.findById(req.user.id);
    user.wishlist.push(item);
    await user.save();

    console.log("✅ Item added to wishlist for user:", user.email);
    res.json({ success: true, wishlist: user.wishlist });
  } catch (err) {
    console.error('❌ Error in wishlist/add:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ POST Remove from Wishlist
router.post('/remove', authenticateToken, async (req, res) => {
  try {
    const { itemName } = req.body;

    const user = await User.findById(req.user.id);
    user.wishlist = user.wishlist.filter(i => i.name !== itemName);
    await user.save();

    console.log(`🗑️ Removed item '${itemName}' from wishlist of ${user.email}`);
    res.json({ success: true, wishlist: user.wishlist });
  } catch (err) {
    console.error('❌ Error removing from wishlist:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
