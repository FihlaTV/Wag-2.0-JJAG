var db = require("../models");

module.exports = function(app) {

    // Create routes
    app.get('/', function(req, res) {
        res.redirect('/signin');
    });

    app.get('/signin', function(req, res) {
        res.render('signin');
    });

    app.get('/signup', function(req, res) {
        res.render('signup');
    });

    app.get('/ownerquestions', function(req, res) {
        res.render('ownerquestions');
    });

    app.get('/dashboard', function(req, res) {
        res.render('dashboard');
    });

    app.get('/administrator', function(req, res) {
        res.render('administrator');
    });


};
