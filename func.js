const User = require('./models/user.js');
const express = require('express');
const CryptoJS = require("crypto-js");
const config = require('./config.js');

// Tries to add user to the database
async function addUser(username, password) {
    data = await User.find({username}).sort({createdAt: -1})

    // If user exists in the database, interrupt
    if(data.length > 0) {
        console.log(`\nFailed to add user: ${username} to the databse, username already exists.`)
        return false
    }

    // Create new User model object with mongoose
    const user = new User({
        username,
        password
    });

    // Save user to database, return result
    return user.save()
    .then((data) => {
        console.log(`\nAdded user: ${username} to the database`)
        return true
    })
    .catch((err) => {
        console.log(err)
        return false
    });
}

// Encrypts the password field of each user object, returns the updated data
function encrypt(password) {
    return CryptoJS.AES.encrypt(password, config.mongodb.key).toString(); 
}

// Decrypts the password field of each user object, returns the updated data
function decrypt(data) {
    for(i = 0; i < data.length; i++) {
        let decrypted = CryptoJS.AES.decrypt(data[i].password, config.mongodb.key)
        let originalText = decrypted.toString(CryptoJS.enc.Utf8);
        data[i].password = originalText
    }
    return data
}

module.exports = {
    addUser,
    encrypt,
    decrypt
}