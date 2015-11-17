var usrs = require('../controllers/users.server.controller'),
passport = require('passport');
module.exports = function(app){
	app.route('/usr')
	.post(usrs.create)	
	.get(usrs.list);
	// ':' means this substring will be handled as a request parameter
	// e.g. 5/users/62eef9735c35141172f0693
	app.route('/usr/:userId') // fuck the BUG, can't write users here!!!!!!!!!!!!!!!!!!
	.get(usrs.read) // route get request to users.read
	.put(usrs.update) // same.here...
	.delete(usrs.delete);

	app.param('userId', usrs.userByID);
	app.route('/signup')
	.get(usrs.renderSignup)
	.post(usrs.signup);

	app.route('/signin')
	.get(usrs.renderSignin) // what is authenticate
	.post(passport.authenticate('local',{
		successRedirect: '/', // where to redirect the request once it successfully authenticated the user
		failureRedirect: '/signin', // where to redirect the request once it failed to authenticate the user
		failureFlash: true // whether or note to use flash messages
	}));
	// equals to app.route(sig).get(function)
	app.get('/signout', usrs.signout);


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
