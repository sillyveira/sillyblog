const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// POST /register - Register a new user and return user info
router.post('/register', authController.register);

// POST /login - Login user and set JWT token as cookie
router.post('/login', authController.login);

module.exports = router;
