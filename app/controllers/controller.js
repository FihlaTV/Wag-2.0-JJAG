var db = require("../models");

module.exports = function(app) {

    // Create routes
    app.get('/', function(req, res) {
        res.redirect('/signin');
    });

    app.get('/signin', function(req, res) {
        res.render('signin');
    });

    app.post('/signin', function(req, res) {
        // will add logic to check if sign-in info is correct
        res.redirect('dashboard');
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
        db.pet.findAll({}).then(function(data) {
            console.log('pet.findAll data', data);
            var petsHbsObject = {foobar:data};
            console.log('petsHbsObject', petsHbsObject);

        res.render('administrator', petsHbsObject);
        });

    });


};
