const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const config = require('../config.js')
const User = require('../models/user.js');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        console.log('\nNo jwt found.')
        res.redirect('/login');
        return;
    }

    jwt.verify(token, config.jwt.key, async (err, data) => {
        if(err) {
            console.log('jwt verification failed: ', err.message);
            res.redirect('/login');
            return;
        }
        console.log('\njwt verification successful, \ndata:', data, '\n');
        let u = await User.findById(data.id);
        if(u != null) {
            next(); //Only keep going if the token exists and is valid AND user still exists.
            return;
        }
        res.redirect('/login');
        return;
    })
};

const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        res.redirect('/');
        return;
    }

    jwt.verify(token, config.jwt.key, async (err, data) => {
        if(err) {
            console.log('jwt verification failed: ', err.message);
            res.redirect('/');
            return;
        }
        console.log('\njwt verification successful, \ndata:', data, '\n');
        let u = await User.findById(data.id);
        if(u != null && config.admins.includes(u._id.toString())) {
            next(); //Only keep going if the token exists and is valid AND user still exists.
            return;
        }
        res.redirect('/');
        return;
    })
};


const getUser = async (req, res, next) => {
    const token = req.cookies.token;

    if(token) {
        jwt.verify(token, config.jwt.key, async (err, data) => {
            if(err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                try {
                    let u = await User.findById(data.id);
                    console.log('Set user to:', u.username);
                    res.locals.user = u;
                    if(config.admins.includes(u._id.toString())) {
                        res.locals.admin = true;
                    } else {
                        res.locals.admin = false;
                    }
                    next();
                } catch (error) {
                    console.log('Token is valid, but user has been deleted recently');
                    res.locals.user = null;
                    next();
                }
            };
        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = { verifyToken, verifyAdmin, getUser }