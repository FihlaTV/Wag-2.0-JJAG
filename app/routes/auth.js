var authController = require('../controllers/authcontroller.js');

module.exports = function(app, passport) {
    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/ownerquestions',
            failureRedirect: '/signup'
        }
    ));
    app.get('/ownerquestions', authController.ownerquestions);
    app.post('/signin', passport.authenticate('local-signin', {
	        successRedirect: '/dashboard',
	        failureRedirect: '/signin'
    	}
	));
    app.get('/dashboard',isLoggedIn, authController.dashboard);
    app.get('/logout',authController.logout);
 	function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
             console.log(req.user.isAdmin);
            return next();
        res.redirect('/signin');
	}

	//app.get('/administrator', authController.administrator);
};