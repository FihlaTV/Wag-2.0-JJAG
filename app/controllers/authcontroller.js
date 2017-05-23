var exports = module.exports = {};
 
exports.signup = function(req, res) {
    res.render('signup');
};

exports.signin = function(req, res) {
    res.render('signin');
};

exports.ownerquestions = function(req, res) {
    res.render('ownerquestions');
};

exports.dashboard = function(req, res) {

	if(req.user.isAdmin) {

		console.log("Admin Login");

	res.render('administrator', req.user);

		}

	else {

		console.log("User Login");
		console.log(req.user);
		res.render('dashboard', req.user);
	}	
   
};

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/signin');
    });
};

// exports.administrator = function(req, res) {
//     res.render('administrator');
// };