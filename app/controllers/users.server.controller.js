var User = require('mongoose').model('User'),
passport = require('passport');
// private method:
// 
var getErrorMessage = function(err){
	var message = '';
	if (err.code){ // what is err.code
		switch(err.code){
			case 11000: //WTF?? BINARY???
			case 11001:
				message = 'Username already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else{
		// what is err.erros
		for (var errName in err.errors){
			// WTF, this line will case a bug that message only contains the last valid error message!
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}
	return message;
};

exports.renderSignin = function(req, res, next){
	if (!req.user){
		// what is render, and what is its parameter
		res.render('signin', {
			title: 'Sign-in Form',
			// req.flash is contained in the module connect-flash
			messages: req.flash('error') || req.flash('info')
		});
	}else{
		// what is redirect
		return res.redirect('/');
	}
};
exports.renderSignup = function(req, res, next){
	if (!req.user){
		res.render('signup', {
			title: 'Sign-up Form',
			messages: req.flash('error')
		});
	} else {
		return res.redirect('/');
	}
};
// sign in is not necessary because passport provides an authentication method, which can be used directly
// uses User model to creat enew users, 
exports.signup = function(req, res, next){
	if (!req.user){
		// create a user object from the http request body
		var user = new User(req.body);
		var message = null;
		user.provider = 'local';
		// save it to MongoDB
		user.save(function(err){
			if (err){
				// get error message is a private function
				var message = getErrorMessage(err);
				req.flash('error', message);
				return res.redirect('/signup');
			}
			req.login(user, function(err){
				if (err) return next(err);
				return res.redirect('/');
			});
		});
	} else {
		return res.redirect('/');
	}
};
// instance method: 
exports.signout = function(req, res){
	req.logout(); // logout is provided by passport module to invalidate the authenticated session
	res.redirect('/');
};

exports.create = function(req, res, next){ // what's exports.create
	var user = new User(req.body); // wat
	user.save(function(err){
		if (err){
			return next(err); // what
		} else{
			res.json(user); // what json
		}
	});
};
exports.list = function(req, res, next){
	User.find({},'username created', function(err, users){
		if (err){
			return next(err);
		} else{
			res.json(users);
		}
	});
};
// get the json representation of the req.user object
// 
exports.read = function(req, res){
	res.json(req.user);
};
// read single document
exports.userByID = function(req, res, next, id){

	User.findOne({
		_id: id
	}, function(err, user) {
		if (err) {
			return next(err);
		} else {
			req.user = user;
			next();
		}
	});
};
// Mongoose contains
// update, findOneAndUpdate and findByIdAndUpdate method
//
exports.update = function(req, res, next){
	User.findByIdAndUpdate(req.user.id, req.body, function(err, user){
		if (err){
			return next(err);
		}else{
			res.json(user);
		}
	});
};

exports.delete = function(req, res, next){
	req.user.remove(function(err) {
		if (err){
			return next(err);
		} else{
			res.json(req.user);
		}
	});
};

exports.saveOAuthUserProfile = function(req, profile, done){
	User.findOne({
		provider: profile.provider,
		providerId: profile.providerId
	}, function(err, user){
		if (err){
			return done(err);
		}else{
			if (!user){
				var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');
				User.findUniqueUsername(possibleUsername, null, function(availableUsername){
					profile.username = availableUsername;
					user = new User(profile);
					user.save(function(err){
						if(err){
							// what is _this?
							var message = _this.getErrorMessage(err);
							req.flash('error', message);
							return res.redirect('/signup');
						}
						return done(err, user);
					});
				});
			} else{
				return done(err, user);
			}
		}
	});
};
// uses passport initiated req.isAuthenticated() method to check whether a user is currently authenticated.

exports.requiresLogin = function(req, res, next){
	if (!req.isAuthenticated()){
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}
	next();
}