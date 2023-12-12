const config = require('../config.js');
const express = require('express');
const User = require('../models/user.js');
const { encrypt, decrypt, addUser} = require('../func.js');

const user_get_all = (req, res) => {
    User.find().sort({createdAt: -1})
    .then((users) => {
        users = decrypt(users)
        res.render('users', { title: 'Users', users})
    })
    .catch((err) => {console.log(err)})
};

const user_get_register = (req, res) => {
    res.render('register', { title: 'Register'})
};

const user_post_register = async (req, res) => {
    let username = req.body.username;
    let password = encrypt(req.body.password);
    
    if(await addUser(username, password)) {
        //Set cookies to logged in.
        res.json({ success: true, redirect: '/'})
    } else {
        res.json({ success: false, message: 'Username already exists.'})
    }
}

const user_delete = (req,res) => {
    id = req.params.id
    User.findByIdAndDelete(id)
    .then((data) => {
        res.json({ redirect: '/user/list'})
    })
    .catch((err) => {console.log(err)});
};

module.exports = {
    user_get_all,
    user_get_register,
    user_post_register,
    user_delete
}


