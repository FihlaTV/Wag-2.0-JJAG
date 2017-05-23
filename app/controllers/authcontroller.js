var exports = module.exports = {};
 
exports.signup = function(req, res) {
    res.render('signup');
};

exports.signin = function(req, res) {
    res.render('signin');
};

exports.dashboard = function(req, res) {

	if(req.user.isAdmin) {

		console.log("Admin Login")

	res.render('administrator', req.user);

		}

	else {

		console.log("User Login")	
		res.render('dashboard', req.user);
	}	
   
}

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/signin');
    });
};

// exports.administrator = function(req, res) {
//     res.render('administrator');
// };