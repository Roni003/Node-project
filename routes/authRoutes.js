const express = require('express');

const config = require('../config.js');
const User = require('../models/user.js');
const authController = require('../controllers/authController.js');
const { verifyToken } = require('../middleware/auth.js')

const router = express.Router();


// Display register page
router.get('/register', authController.get_register);

// Display login page
router.get('/login', authController.get_login);

// Logout, redirect to login
router.get('/logout', authController.get_logout);

//Handle register submit, post requests
router.post('/register/', authController.post_register);

// Handle login submit, post requests
router.post('/login/', authController.post_login);

module.exports = router;