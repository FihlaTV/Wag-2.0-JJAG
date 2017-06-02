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
                    res.redirect('/adminDashboard');
                }
                else {
                    loggedIn.userID = userinfo.users_id;
                    var thisIDCheck = userinfo.users_id;
                        db.owner.findOne({
                            where: {
                                owners_id: thisIDCheck
                            }
                        }).then(function (ownerResult) {
                            console.log('owner name from db call', ownerResult.first_name);
                            if (ownerResult) {
                                console.log("This Owner Exists!!!");
                                thisOwnerId = ownerResult.owners_id;
                                res.redirect('/dashboard');
                            }
                        });
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
                }
            }).then(function (eventinfo) {
                //TODO write for loop to set a new property on event with the image .event-icon (*.svg) name
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


