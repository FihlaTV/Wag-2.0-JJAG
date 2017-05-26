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
    //     var checkEmail,
    //         checkPassword;

       checkEmail = req.body.email ;
       checkPassword = req.body.password ;

       console.log(checkEmail + ", " + checkPassword);

       db.user.findOne({

            where: {
                email: checkEmail
            }

       }).then(function(userinfo) {

            if (userinfo) {

                console.log("Success!");
                console.log(checkEmail + ", " + checkPassword);

               var loggedIn = {};
                console.log(userinfo.email);
                loggedIn.email = userinfo.email;
                loggedIn.password = userinfo.password;

                if(userinfo.isAdmin) {

                    res.render('administrator', loggedIn);

                }

                else{
                     res.render('dashboard', loggedIn);
                }
               

            }

            else {
                console.log("User not found");
                console.log(userinfo);
                res.render('signin');
            };

    });

//     isEmailUnique(checkEmail).then(isUnique => {
//     if (isUnique) {
//         console.log("UNIQUE!!")
//     }

//     else {console.log("NOPE")}
// });

       // res.redirect('dashboard');
    });

    app.get('/signup', function(req, res) {
        res.render('signup');
    });


    app.post('/signup', function (req, res) {

        console.log("New User: ", req.body); 

        db.user.create({
            email: req.body.email,
            password: req.body.password,
            isAdmin: false

        }).then(function(results) {
            // console.log("results");
            // var userinfo = {foobar:results};
            // console.log("User Info: ", userinfo); 

            // res.render('ownerquestions', userinfo);
            var newUser = {};
            console.log(results.email);
            newUser.email = results.email;
            newUser.password = results.password;

            myEmail = newUser.email;
            myID = results.users_id;



            res.render('ownerquestions', newUser);

        });
    });



    app.get('/ownerquestions', function(req, res) {
        res.render('ownerquestions');
    });

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
        //THEN res.redirect to /dashboard
            console.log(results);
            res.redirect('/addpet');
        });
    });

    app.get('/addpet', function(req, res) {
        res.render('addpet');
    });

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
            //THEN res.redirect to /dashboard
            console.log(results);
            var addPetHbsObject = {addPetHbsObject: results};
            res.render('dashboard', addPetHbsObject);
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


function isEmailUnique (thisEmail) {
    return db.user.count({ where: { email: thisEmail } })
      .then(count => {
        if (count != 0) {
          return true;
        }
        return false;
    });
}