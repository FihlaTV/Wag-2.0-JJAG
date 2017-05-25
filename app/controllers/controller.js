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

    app.post('/ownerquestions', function(req, res) {

        console.log('req.body', req.body);
        // gather data from form fields and hit Owner model
        db.owner.create({
            users_id: 1,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            address: req.body.email,
            phone: req.body.phone
        }).then(function(results) {
        //THEN res.redirect to /dashboard
            console.log(results);
            res.redirect('/dashboard');
        });
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
