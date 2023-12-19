const express = require('express');

const config = require('../config.js');
const User = require('../models/user.js');
const userController = require('../controllers/userController.js');
const {verifyAdmin} = require('../middleware/auth.js')


const router = express.Router();

// Display all users
router.get('/users/get', verifyAdmin, userController.user_get_all);

// Display single user
router.get('/users/get/:username', verifyAdmin, userController.user_get_single);

// Handle delete user request
router.delete('/users/:id', verifyAdmin, userController.user_delete);


module.exports = router;