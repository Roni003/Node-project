const config = require('../config.js');
const User = require('../models/user.js');
const express = require('express');
const CryptoJS = require("crypto-js");
const userController = require('../controllers/userController.js');


const router = express.Router();

// Display all users
router.get('/user/list', userController.user_get_all);

// Display register page
router.get('/user/register', userController.user_get_register);

//Handle register submit, post requests
router.post('/user/register/', userController.user_post_register);

// Handle delete user request
router.delete('/user/delete/:id', userController.user_delete);


module.exports = router;