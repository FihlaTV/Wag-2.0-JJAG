var db = require("../models");

   var myEmail;
   var myID;


module.exports = function(app) {

    var thisUserId,
        thisOwnerId,
        thisPetId,
        thisEventId;

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

    // add new user to users table
    app.post('/signup', function (req, res) {

        console.log("New User: ", req.body); 

        db.user.create({
            email: req.body.email,
            password: req.body.password,
            isAdmin: false

        }).then(function(results) {
            // console.log("results");
            var newUser = {};
            console.log(results.email);
            newUser.email = results.email;
            newUser.password = results.password;

            myEmail = newUser.email;
            myID = results.users_id;
            // new users redirected to ownerquestions
            res.render('ownerquestions', newUser);

        });
    });

    app.get('/ownerquestions', function(req, res) {
        res.render('ownerquestions');
    });

    // add owner info to owner table
    app.post('/ownerquestions', function(req, res) {
        console.log('req.body', req.body);
        // gather data from form fields and hit Owner model
        db.owner.create({
            users_id: myID,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: myEmail,
            address: req.body.address,
            phone: req.body.phone

        }).then(function(results) {
            thisOwnerId = results.owners_id;
        // new owners redirected to addpet
            console.log(results);
            res.redirect('/addpet');
        });
    });

    app.get('/addpet', function(req, res) {
        res.render('addpet');
    });

    // add pet info to pets table
    app.post('/addpet', function(req, res) {
        console.log('req.body', req.body);
        // gather data from form fields and hit Pet model
        db.pet.create({
            owners_id: thisOwnerId,
            pet_name: req.body.pet_name,
            pet_type: req.body.pet_type,
            img_link: req.body.img_link,
            notes: req.body.notes
        }).then(function(results) {
            //THEN redirect to /dashboard
            console.log(results);
            var addPetHbsObject = {addPetHbsObject: results};
            res.render('dashboard', addPetHbsObject);
        });
    });

    app.get('/dashboard', function(req, res) {
        res.render('dashboard');
    });

    // display all pets on administrator landing page
    app.get('/administrator', function(req, res) {
        db.pet.findAll({}).then(function(data) {
            console.log('pet.findAll data', data);
            var petsHbsObject = {foobar:data};
            console.log('petsHbsObject', petsHbsObject);

        res.render('administrator', petsHbsObject);
        });

    });

    // when adding events, redirect to select pets page
    app.post('/administrator', function(req, res) {
        res.redirect('selectpet');
    });

    // get all pets from db to display as links to select (radio buttons or other? to select multiple pets?
    app.get('/selectpet', function(req, res) {
        db.pet.findAll({}).then(function (data) {
            console.log('pet.findAll data', data);
            var selectPetHbsObject = {selPet: data};
            console.log('petsHbsObject', selectPetHbsObject);
            res.render('selectpet', selectPetHbsObject);
        });
    });

    app.get('/addevent/:pets_id', function(req, res) {
        console.log('pet id selected', req.params.pets_id);
        thisPetId = req.params.pets_id;

        res.render('addevent');
    });

    // add event to selected pet_id
    app.post('/addevent', function(req, res) {

        console.log('req.body', req.body);
        // gather data from form fields and hit Event model
        db.event.create({
            pets_id: thisPetId,
            event_type: req.body.event_type,
            notes: req.body.notes,
            img_link: req.body.img_link
        }).then(function (results) {

            console.log(results);
            var addEventHbsObject = {addEventHbsObject: results};

            res.json(results);
        });
    });

};
