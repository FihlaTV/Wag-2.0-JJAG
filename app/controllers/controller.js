var db = require("../models");


module.exports = function (app) {

    // global variables allow passing values to subsequent pages
    var thisUserId,
        thisUserEmail,
        thisOwnerId,
        thisPetId;

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
                db.user.create({
                    email: req.body.email,
                    password: req.body.password,
                    // right now isAdmin would be manually updated in db, outside of application
                    isAdmin: false
                }).then(function (results) {

                    var newUser = {};
                    console.log(results.email);
                    newUser.email = results.email;
                    newUser.password = results.password;

                    thisUserEmail = newUser.email;
                    thisUserId = results.users_id;

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
        // gather data from form fields and hit Owner model
        db.owner.create({
            users_id: thisUserId,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: thisUserEmail,
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
            res.render('userDashboard', ownerHbsObject);
        });
    });

    // display all pets on adminDashboard landing page
    app.get('/adminDashboard', function (req, res) {
        db.pet.findAll({}).then(function (data) {
            console.log('pet.findAll data', data);
            var petsHbsObject = {foobar: data};
            console.log('petsHbsObject', petsHbsObject);

            res.render('adminDashboard', petsHbsObject);
        });

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
            res.redirect('adminDashboard');
        });
    });

    app.get('/events/:pets_id', function (req, res) {
        console.log('pet id selected', req.params.pets_id);
        thisPetId = req.params.pets_id;
        console.log('thisPetId', thisPetId);
        db.pet.findAll({
            where: {
                pets_id: thisPetId
            }
        }).then(function (result) {
            db.event.findAll({
                where: {
                    pets_id: thisPetId
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            }).then(function (eventinfo) {
                for (var i = 0; i < eventinfo.length; i++) {
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

};


