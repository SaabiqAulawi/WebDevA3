const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const User = require('../models/User');

router.get('/getUserRole', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);
    res.json({ role: user.role });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user role' });
  }
});

module.exports = router;
