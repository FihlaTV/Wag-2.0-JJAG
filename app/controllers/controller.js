var db = require("../models");


module.exports = function (app) {

    // global variables allow passing values to subsequent pages
    var thisUserId,
        thisUserEmail,
        thisOwnerId,
        thisPetId,
        thisActivity;

    // landing page
    app.get('/', function (req, res) {
        res.render('wagr');
    });

    // sign in page
    app.get('/signin', function (req, res) {
        res.render('signin');
    });

    app.post('/signin', function (req, res) {
        var checkEmail = req.body.email;
        var checkPassword = req.body.password;
        console.log(checkEmail + ", " + checkPassword);
        db.user.findOne({
            where: {
                email: checkEmail
            }
        }).then(function (userinfo) {
            // if user is found
            if (userinfo) {
                console.log("Success!");
                console.log(checkEmail + ", " + checkPassword);
                console.log(userinfo.email);
                // if user is an administrator, redirect to /adminDashboard
                if (userinfo.isAdmin) {
                    res.redirect('/adminDashboard');
                }
                // if not admin, redirect to /userDashboard
                else {
                    // this var holds current users_id
                    var thisIDCheck = userinfo.users_id;
                        // db call finds which owner is associated with current user
                        db.owner.findOne({
                            where: {
                                owners_id: thisIDCheck
                            }
                        }).then(function (ownerResult) {
                            console.log('owner name from db call', ownerResult.first_name);
                            if (ownerResult) {
                                console.log("This Owner Exists!!!");
                                // reassign global var thisOwnerId to current owner
                                // necessary so if existing user logs in and adds new pet, new pet will be associated with most recently logged in owners_id
                                thisOwnerId = ownerResult.owners_id;
                                res.redirect('/dashboard');
                            }
                        });
                    }
                }
            else {
                // if no user found in db, render signin page and send error to dom
                console.log("User not found");
                var details2 = {};
                details2.myerror = "That email doesn't exist!";
                res.render('signin', details2);
            }
        });
    });

    // sign up route
    app.get('/signup', function (req, res) {
        res.render('signup');
    });

    // add new user to users table
    app.post('/signup', function (req, res) {
        console.log("New User: ", req.body);
        // checker to make sure new email hasn't been used before
        db.user.findOne({
            where: {
                email: req.body.email
            }
        }).then(function (userinfo) {
            // if email exists, render signup and send error to dom
            if (userinfo) {
                console.log("That email already exists!");
                var details = {};
                details.myerror = "That email already exists!";
                res.render("signup", details);
            }
            else {
                // create user in db
                db.user.create({
                    email: req.body.email,
                    password: req.body.password,
                    // current app, isAdmin property would be manually updated in db, outside of app
                    isAdmin: false
                }).then(function (results) {
                    console.log('new user email', results.email);
                    thisUserEmail = results.email;
                    thisUserId = results.users_id;
                    // redirect to ownerquestions endpoint
                    res.redirect('/ownerquestions');
                });
            }
        });
    });

    app.get('/ownerquestions', function (req, res) {
        res.render('ownerform');
    });

    // add owner info to owner table
    app.post('/ownerquestions', function (req, res) {
        console.log('req.body', req.body);
        // concatenate address fields together
        var fullAddress = req.body.address + ', ' +
                req.body.city + ', ' +
                req.body.state + ' ' +
                req.body.zip;
        console.log('fullAddress', fullAddress);
        // gather data from form fields and hit Owner model
        db.owner.create({
            // populates users_id foreign key from global var assigned in sign up post route
            users_id: thisUserId,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            // populate email from global var assigned in sign up post route
            // so user doesn't have to type email twice
            email: thisUserEmail,
            address: fullAddress,
            phone: req.body.phone
        }).then(function (results) {
            // reassign thisOwnerId for passing to pets table in subsequent step
            thisOwnerId = results.owners_id;
            console.log(results.first_name + ' is owners_id ' + results.owners_id + ' and is added to db!');
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
            // populates owners_id foreign key from global var assigned in ownerquestions post route
            owners_id: thisOwnerId,
            pet_name: req.body.pet_name,
            pet_type: req.body.pet_type,
            img_link: req.body.img_link,
            notes: req.body.notes,
            checkedIn: 0
        }).then(function (results) {
            console.log(results.pet_name + ' is pets_id ' + results.pets_id + ' and is added to db!');
            res.redirect('/dashboard');
        });
    });

    // user dashboard - calls db to display all owner's pets
    app.get('/dashboard', function (req, res) {
        // check last owners_id from either signup or signin route
        console.log('/dashboard thisOwnerId', thisOwnerId);
        // db call to find all pets belonging to this owner
        db.pet.findAll({
            where: {
                owners_id: thisOwnerId
            }
        }).then(function (data) {
            console.log('this owner has ' + data.length + ' pets');
            // object to send to handlebars
            var ownerHbsObject = {foobar: data};
            res.render('userDashboard', ownerHbsObject);
        });
    });


    // display all pets in pets table on adminDashboard landing page
    app.get('/adminDashboard', function (req, res) {
        db.pet.findAll({}).then(function (data) {
            console.log('there are ' + data.length + ' pets in db');
            // object to send to handlebars
            var petsHbsObject = {foobar: data};
            console.log('petsHbsObject', petsHbsObject);
            res.render('adminDashboard', petsHbsObject);
        });
    });


    app.get('/selectactivity', function (req, res) {
        res.render('selectactivity');
    });

    // activities on /selectactivity endpoint link to /selectactivity/:activity endpoint
    app.get('/selectactivity/:activity', function (req, res) {
        // assign selected activity to global var to pass to subsequent page
        thisActivity = req.params.activity;
        console.log('activity selected', thisActivity);
        // db call to display all pets in pets table
        db.pet.findAll({}).then(function (data) {
            console.log('pet.findAll data', data);
            // object to send to handlebars
            var selectPetHbsObject = {selPet: data};
            res.render('selectpet', selectPetHbsObject);
        });
    });

    // pets on /selectactivity:activity endpoint links to /addevent/:pets_id endpoint
    app.get('/addevent/:pets_id', function (req, res) {
        console.log('pet id selected', req.params.pets_id);
        // assign current pets_id to global var to pass to subsequent page
        thisPetId = req.params.pets_id;
        res.render('addevent');
    });

    // add event to selected pets_id
    app.post('/addevent', function (req, res) {

        console.log('req.body', req.body);
        // gather data from form fields and hit Event model
        db.event.create({
            // populates pets_id foreign key from global var assigned in addevent get route
            pets_id: thisPetId,
            // populates event_type from global var assigned in selectactivity get route
            event_type: thisActivity,
            notes: req.body.notes,
            img_link: req.body.img_link
        }).then(function (results) {
            console.log(results);
            // after adding event, redirect to adminDashboard
            res.redirect('adminDashboard');
        });
    });

    // route to display daily events of pet
    app.get('/events/:pets_id', function (req, res) {
        console.log('pet id selected', req.params.pets_id);
        // hold pets_id from params in variable to do db call
        thisPetId = req.params.pets_id;
        console.log('thisPetId', thisPetId);
        // db call to find pet info (for rendering picture and name on dom)
        db.pet.findAll({
            where: {
                pets_id: thisPetId
            }
        }).then(function (result) {
            // db call to find all events associated with this pet
            db.event.findAll({
                where: {
                    pets_id: thisPetId
                },
                order: [
                    // order descending so newest events are at top of 'event feed'
                    ['createdAt', 'DESC']
                ]
            }).then(function (eventinfo) {
                // loop through each event
                for (var i = 0; i < eventinfo.length; i++) {
                    // determine event_type and inject eventinfo[i].image_name dependent upon event_type
                    // this passes to handlebars and renders appropriate icon dependent upon event_type
                    switch (eventinfo[i].event_type) {
                        case 'Potty':
                            eventinfo[i].image_name = 'potty';
                            break;
                        case 'Incident':
                            eventinfo[i].image_name = 'incident';
                            break;
                        case 'Photo':
                            eventinfo[i].image_name = 'photo';
                            break;
                        case 'Eat':
                            eventinfo[i].image_name = 'eat';
                            break;
                        case 'Exercise':
                            eventinfo[i].image_name = 'excercise';
                            break;
                        case 'Medication':
                            eventinfo[i].image_name = 'medication';
                            break;
                        case 'Note':
                            eventinfo[i].image_name = 'note';
                            break;
                        default:
                            eventinfo[i].image_name = 'check'
                    }
                }
                // object to send both pet info and events info to handlebars
                var hbs = {
                    thisPet: result,
                    eventHbsObject: eventinfo};
                res.render('events', hbs);
            });
        });

    });

    app.get('/logout', function (req, res) {
        res.redirect('/');
    });

    // route to check in/out page
    app.get('/check', function (req, res) {
        // db call to display all pets in pets table
        db.pet.findAll({}).then(function (data) {
            // object to send to handlebars
            var selectPetHbsObject2 = {selPet: data};
            res.render('checkinout', selectPetHbsObject2);
        });

    });

    // check in or our specific pet
    app.get('/check/:pets_id', function (req, res) {
        var thisPet = req.params.pets_id;
        console.log('pet checking', thisPet);

        db.pet.findAll({
            where: {
                pets_id: thisPet
            }
        }).then(function (data) {
            console.log('pre if statement');
            console.log(data[0].checkedIn);

            if (data[0].checkedIn) {
                console.log('checking out ' + data[0].pets_id);
                db.pet.update({
                    checkedIn: 0
                }, {
                    where: {
                        pets_id: thisPet
                    }
                }).then(function () {
                    res.redirect('/check');
                });
            } else {
                console.log('checking in ' + data[0].pets_id);
                db.pet.update({
                    checkedIn: 1
                }, {
                    where: {
                        pets_id: thisPet
                    }
                }).then(function () {
                    res.redirect('/check');
                });
            }
        });
    });

};


