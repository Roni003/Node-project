const config = require('../config.js');
const express = require('express');
const User = require('../models/user.js');
const { createJWT } = require('../func.js');


// Display register page
const get_register = (req, res) => {
    res.render('register', { title: 'Register'})
};

// Display login page
const get_login = (req, res) => {
    res.render('login', { title: 'Login' })
}

const get_logout = async (req, res) => {
    res.clearCookie('token');
    res.redirect('/login')
}

// Handle register submit, post requests
const post_register = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password

    try {
        //Set cookies to logged in.
        const user = await User.create({username, password})
        const token = createJWT(user._id);
        res.cookie('token', token, { httpOnly: true, maxAge: config.jwt.sessionLength * 1000})
        res.json({ success: true, redirect: '/'})
    } catch (err) {
        res.json({ success: false, message: 'Error in adding user, user already exists'})
    }
}

// handle login post requests
const post_login = async (req, res) => {
    try {
        const user = await User.login(req.body.username, req.body.password);
        const token = createJWT(user._id);
        res.cookie('token', token, {  httpOnly: true, maxAge: config.jwt.sessionLength * 1000})
        res.json({ success: true, redirect: '/'} );
    } catch (err) {
        console.log(err)
        res.json({ success: false, message: 'Wrong password or username, or user does not exist'})
    }
}

module.exports = {
    get_register,
    get_login,
    get_logout,
    post_register,
    post_login,
}