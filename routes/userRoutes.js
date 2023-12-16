const express = require('express');

const config = require('../config.js');
const User = require('../models/user.js');
const userController = require('../controllers/userController.js');
const verifyToken = require('../middleware/verifyToken.js')


const router = express.Router();

// Display all users
router.get('/users/get', verifyToken,userController.user_get_all);

// Display single user
router.get('/users/get/:username', verifyToken, userController.user_get_single);

// Handle delete user request
router.delete('/users/:id', verifyToken, userController.user_delete);


module.exports = router;