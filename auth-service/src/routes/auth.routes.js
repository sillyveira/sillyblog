const express = require('express');
const authController = require('../controllers/auth.controller');

const {extractUserFromHeaders} = require('../utils/userHeaders');
const router = express.Router();

// POST /register - Register a new user and return user info
router.post('/register', authController.register);

// POST /login - Login user and set JWT token as cookie
router.post('/login', authController.login);

// POST /logout - Remove JWT token cookie
router.post('/logout', authController.logout);

// GET /profile/:id - Get user profile by ID
router.get('/profile/:id', authController.getProfile);

module.exports = router;
