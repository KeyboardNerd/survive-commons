var users = require('../controllers/users.server.controller'),
passport = require('passport');
module.exports = function(app){
	app.route('/users')
	.post(users.create)	
	.get(users.list);
	// ':' means this substring will be handled as a request parameter
	// e.g. 5/users/62eef9735c35141172f0693
//	------------------v------
	app.route('/users/:userId')
	.get(users.read)
	.put(users.update)
	.delete(users.delete); // what's put and delete?
	// where userId is defined?
	// the userId is defined in route, and will be handled as a request parameter
	// what will be passed to param? something within the request parameter: 562eef9735c35141172f0693 for example, which replaces the :userId
	// handle population of the req.user object, users.userById() method will be executed before any other middleware registered with the userId parameter, which in this case is the users.read() middleware
	app.param('userId', users.userByID);

	app.route('/signup')
	.get(users.renderSignup)
	.post(users.signup);

	app.route('/signin')
	.get(users.renderSignin) // what is authenticate
	.post(passport.authenticate('local',{
		successRedirect: '/', // where to redirect the request once it successfully authenticated the user
		failureRedirect: '/signin', // where to redirect the request once it failed to authenticate the user
		failureFlash: true // whether or note to use flash messages
	}));
	// equals to app.route(sig).get(function)
	app.get('/signout', users.signout);


	// facebook strategy routes:
	// use authenticate method to start the user authentication process
	app.get('/oauth/facebook', passport.authenticate('facebook', {
     failureRedirect: '/signin'
   	}));
   	// use authenticate method to finish the authentication process once the user has linked their facebookprofile
   	app.get('/oauth/facebook/callback', passport.authenticate('facebook',
   	{
     failureRedirect: '/signin',
     successRedirect: '/'
   	}));


   	// twitter strategy routes:
   	app.get('/oauth/twitter', passport.authenticate('twitter', {
   		failureRedirect: '/signin'
   	}));
   	app.get('/oauth/twitter/callback', passport.authenticate('twitter',
   	{
   		failureRedirect: '/signin',
   		successRedirect: '/'
   	}));


   	// google strategy routes:
   	app.get('/oauth/google', passport.authenticate('google', {
     failureRedirect: '/signin',
     scope: [
       'https://www.googleapis.com/auth/userinfo.profile',
       'https://www.googleapis.com/auth/userinfo.email'
     ],
	}));
   	app.get('/oauth/google/callback', passport.authenticate('google', {
    	 failureRedirect: '/signin',
    	 successRedirect: '/'
	}));
};
