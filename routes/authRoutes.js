const express = require('express');

const config = require('../config.js');
const User = require('../models/user.js');
const authController = require('../controllers/authController.js');
const verifyToken = require('../middleware/verifyToken.js')

const router = express.Router();


// Display register page
router.get('/register', authController.get_register);

//Handle register submit, post requests
router.post('/register/', authController.post_register);

// Display login page
router.get('/login', authController.get_login);

// Handle login submit, post requests
router.post('/login/', authController.post_login);

module.exports = router;