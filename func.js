const User = require('./models/user.js');
const express = require('express');
const config = require('./config.js');
const jwt = require('jsonwebtoken');

const createJWT = (userId) => {
    return jwt.sign({ id: userId }, config.jwt.key, { expiresIn: config.jwt.sessionLength })
}

// Encrypts the password field of each user object, returns the 

module.exports = {
    createJWT,
}