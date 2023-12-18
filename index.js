const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const User = require('./models/user.js')

// Local imports
const config = require('./config.js');
const userRoutes = require('./routes/userRoutes.js');
const authRoutes = require('./routes/authRoutes.js')
const { getUser } = require('./middleware/auth.js')

// Constants
const app = express();
const PORT = 3000

// Set view engine to ejs
app.set('view engine', 'ejs')

// Connect to db, then start listening at PORT
connectdb()

// Middleware
app.use(express.static('public')); // Send static files in './public/'
app.use(morgan('dev')); // Print request info
app.use(express.urlencoded({ extended: true })) // So we can parse the body of post requests
app.use(express.json()) // So we can parse the body of post requests
app.use(cookieParser()) // So we can parse cookies


//Store current user (if logged in), to res.locals.user
app.get('*', getUser);

// home page
app.get('/', (req, res) => {
    res.status(200).render('index', {title: 'Home'} );
});

// Auth routes, login, register, logout etc
app.use(authRoutes);

// User routes
app.use(userRoutes);

// 404 handler, has to be at the bottom since it responds, stopping the rest of the code below from running
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});

// Connect to db, then start listening at PORT
function connectdb() {
    const dbURI = `mongodb+srv://${config.mongodb.username}:${config.mongodb.password}@node-project.7ypurln.mongodb.net/node-project?retryWrites=true&w=majority`
    mongoose.connect(dbURI)
    .then(() => {
        console.log(`Connected to mongoDB database | User: ${config.mongodb.username}`)
        app.listen(PORT, () => {console.log(`Server is running on port 3000 | http://localhost:${PORT}`)});
    })
    .catch((err) => {console.log(err)});

}