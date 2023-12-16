const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const config = require('../config.js')

module.exports = verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        console.log('\nNo jwt found.')
        res.redirect('/login');
        return;
    }

    jwt.verify(token, config.jwt.key, (err, data) => {
        if(err) {
            console.log('jwt verification failed: ', err.message);
            res.redirect('/login');
            return;
        }
        console.log('\njwt verification successful, \ndata:', data, '\n');
        next(); //Only keep going if the token exists and is valid.        
    })
};