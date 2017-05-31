var db = require("../models");

var myEmail;
var myID;


module.exports = function (app) {

    var thisUserId,
        thisOwnerId,
        thisPetId,
        thisEventId,
        addPetHbsObject;

    // Create routes
    app.get('/', function (req, res) {
        res.render('wagr');
    });

    app.get('/signin', function (req, res) {
        res.render('signin');
    });

    app.post('/signin', function (req, res) {
        // will add logic to check if sign-in info is correct
        //     var checkEmail,
        //         checkPassword;
        checkEmail = req.body.email;
        checkPassword = req.body.password;
        console.log(checkEmail + ", " + checkPassword);
        db.user.findOne({
            where: {
                email: checkEmail
            }
        }).then(function (userinfo) {
            if (userinfo) {
                console.log("Success!");
                console.log(checkEmail + ", " + checkPassword);
                var loggedIn = {};
                console.log(userinfo.email);
                loggedIn.email = userinfo.email;
                loggedIn.password = userinfo.password;

                if (userinfo.isAdmin) {
                    res.redirect('/administrator');
                }
                else {
                    res.redirect('/dashboard');

                    loggedIn.userID = userinfo.users_id;

                    var thisIDCheck = userinfo.users_id;
                    if (userinfo.isAdmin) {
                        res.redirect('/administrator');
                    }
                    else {

                        console.log("The current ID is " + thisIDCheck + " and when we add three it is " + (thisIDCheck + 3));

                        db.owner.findOne({
                            where: {
                                owners_id: thisIDCheck
                            }
                        }).then(function (ownerResult) {
                            if (ownerResult) {

                                console.log("This Owner Exists!!!");

                                var thisOwner = {};
                                thisOwner.first_name = ownerResult.first_name;
                                thisOwner.last_name = ownerResult.last_name;
                                thisOwner.address = ownerResult.address;
                                thisOwner.email = ownerResult.email;
                                thisOwner.phone = ownerResult.phone;
                                thisOwner.id = ownerResult.owners_id;

                                res.render('dashboard', thisOwner);
                            }
                        });
                    }
                }
            }
            else {
                console.log("User not found");
                var details2 = {};
                details2.myerror = "That email doesn't exist!";
                res.render('signin', details2);
            }

        });
    });

    app.get('/signup', function (req, res) {
        res.render('signup');
    });

    // add new user to users table
    app.post('/signup', function (req, res) {
        console.log("New User: ", req.body);
        db.user.findOne({
            where: {
                email: req.body.email
            }
        }).then(function (userinfo) {
            if (userinfo) {
                console.log("That email already exists!");
                var details = {};
                details.myerror = "That email already exists!";
                res.render("signup", details);
            }
            else {
                db.user.create({
                    email: req.body.email,
                    password: req.body.password,
                    isAdmin: false
                }).then(function (results) {

                    var newUser = {};
                    console.log(results.email);
                    newUser.email = results.email;
                    newUser.password = results.password;

                    myEmail = newUser.email;
                    myID = results.users_id;

                    res.render('ownerquestions', newUser);
                });
            }
        });
    });

    app.get('/ownerquestions', function (req, res) {
        res.render('ownerquestions');
    });

    // add owner info to owner table
    app.post('/ownerquestions', function (req, res) {
        console.log('req.body', req.body);
        // gather data from form fields and hit Owner model
        db.owner.create({
            users_id: myID,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: myEmail,
            address: req.body.address,
            phone: req.body.phone

        }).then(function (results) {
            thisOwnerId = results.owners_id;
            // new owners redirected to addpet
            console.log(results);
            console.log("new owner created, should redirect here");
            res.redirect('/addpet');
        });
    });

    app.get('/addpet', function (req, res) {
        res.render('addpet');
    });

    // add pet info to pets table
    app.post('/addpet', function (req, res) {
        console.log('req.body', req.body);
        // gather data from form fields and hit Pet model
        db.pet.create({
            owners_id: thisOwnerId,
            pet_name: req.body.pet_name,
            pet_type: req.body.pet_type,
            img_link: req.body.img_link,
            notes: req.body.notes,
            checkedIn: 0
        }).then(function (results) {
            //THEN redirect to /dashboard
            console.log(results);
            res.redirect('/dashboard');
        });
    });

    app.get('/dashboard', function (req, res) {
        console.log('/dashboard thisOwnerId', thisOwnerId);
        db.pet.findAll({
            where: {
                owners_id: thisOwnerId
            }
        }).then(function (data) {
            console.log('dashboard pet.findAll data', data);
            var ownerHbsObject = {foobar: data};
            console.log('ownerHbsObject', ownerHbsObject);
            res.render('mypets', ownerHbsObject);
        });
    });

    // display all pets on administrator landing page
    app.get('/administrator', function (req, res) {
        db.pet.findAll({}).then(function (data) {
            console.log('pet.findAll data', data);
            var petsHbsObject = {foobar: data};
            console.log('petsHbsObject', petsHbsObject);

            res.render('administrator', petsHbsObject);
        });

    });


    // when adding events, redirect to select pets page
    app.post('/administrator', function (req, res) {
        res.redirect('selectactivity');
    });

    var thisActivity;

    app.get('/selectactivity', function (req, res) {
        res.render('selectactivity');
    });
    app.get('/selectactivity/:activity', function (req, res) {
        thisActivity = req.params.activity;
        console.log('thisActivity', thisActivity);
        db.pet.findAll({}).then(function (data) {
            console.log('pet.findAll data', data);
            var selectPetHbsObject = {selPet: data};
            console.log('petsHbsObject', selectPetHbsObject);
            res.render('selectpet', selectPetHbsObject);
        });
    });


    app.get('/addevent/:pets_id', function (req, res) {
        console.log('pet id selected', req.params.pets_id);
        thisPetId = req.params.pets_id;

        res.render('addevent');
    });

    // add event to selected pet_id
    app.post('/addevent', function (req, res) {

        console.log('req.body', req.body);
        // gather data from form fields and hit Event model
        db.event.create({
            pets_id: thisPetId,
            event_type: thisActivity,
            notes: req.body.notes,
            img_link: req.body.img_link
        }).then(function (results) {

            console.log(results);

            res.redirect('administrator');
        });
    });

    app.get('/events/:pets_id', function (req, res) {
        console.log('pet id selected', req.params.pets_id);
        thisPetId = req.params.pets_id;
        db.event.findAll({
            where: {
                pets_id: req.params.pets_id
            }
        }).then(function (eventinfo) {
            console.log(eventinfo);
            var eventHbsObject = {eventHbsObject: eventinfo};
            res.render('events', eventHbsObject);
        });

    });


    app.get('/logout', function (req, res) {

        res.render('signin');
    });


};


