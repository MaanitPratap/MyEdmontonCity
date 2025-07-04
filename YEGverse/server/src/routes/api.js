const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

// Public route (no authentication needed)
router.get('/public', (req, res) => {
  res.json({ message: 'This is a public endpoint' });
});

// Protected route (authentication required)
router.get('/protected', verifyToken, (req, res) => {
  res.json({ 
    message: 'This is a protected endpoint',
    user: req.user 
  });
});

module.exports = router;