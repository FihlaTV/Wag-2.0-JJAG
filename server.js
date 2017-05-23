// Package dependency declarations
var express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    passport = require('passport'),
    session = require('express-session'),
    exphbs = require('express-handlebars'),
    env = require('dotenv').load();


// App initialization
var PORT = process.env.PORT || 5000;
var app = express();


// Configure morgan
app.use(logger("dev"));


// Configure BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Make public dir static
app.use(express.static('./app/public'));


// Configure Handlebars
app.set('views', 'app/views');
app.engine("hbs", exphbs({
    defaultLayout: "main",
    extname: '.hbs',
    layoutsDir:'app/views/layouts',
    partialsDir:'app/views/partials'}));
app.set("view engine", "hbs");


// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// Models
var models = require("./app/models");


// Routes
var authRoute = require('./app/routes/auth.js')(app,passport);


// Load passport strategies
require('./app/config/passport/passport.js')(passport, models.user);


// Sync Database
models.sequelize.sync({force: true}).then(function() {
    console.log('Welcome to Passport!')
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});

app.get('/', function(req, res) {
    // res.send('Welcome to Passport with Sequelize');
    res.redirect('/signin');
});

// Start server listening
app.listen(PORT, function(err) {
    if (!err)
        console.log(`Site is live, running on port ${PORT}!`);
    else console.log(err)
});
