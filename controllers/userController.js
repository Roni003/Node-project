const config = require('../config.js');
const express = require('express');
const User = require('../models/user.js');
const { addUser, createJWT } = require('../func.js');

// Display all users
const user_get_all = async (req, res) => {
    try {
        const users = await User.find().sort({createdAt: -1})
        if(!users) {
            res.status(404).render('404', {  title: '404'})
            return
        }
        res.render('users', { title: 'Users', users: users, searchValue: ''})
    } catch (err) {
        console.log(err)
    }
};

// Find user by username
const user_get_single = async (req, res) => {
    try {
        const user = await User.find({ username: new RegExp('^'+req.params.username+'$', "i")})
        if(!user) {
            res.status(404).render('404', { title: '404'})
            return
        }
        res.render('users', { title: req.params.username, users: user, searchValue: req.params.username})
    } catch (err) {
        console.log(err)
    }
}

// Handle delete user request
const user_delete = (req,res) => {
    id = req.params.id
    User.findByIdAndDelete(id)
    .then((data) => {
        res.json({ redirect: '/users/get'})
    })
    .catch((err) => {console.log(err)});
};

module.exports = {
    user_get_all,
    user_get_single,
    user_delete
}


