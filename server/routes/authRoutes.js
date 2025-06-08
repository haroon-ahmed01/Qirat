const express = require('express');
const router = express.Router();
const { register, login, getProtected } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/protected', verifyToken, getProtected);

module.exports = router;