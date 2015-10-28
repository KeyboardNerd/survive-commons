module.exports = {
	sessionSecret: 'developmentSessionSecret',
	db: 'mongodb://localhost/mean',
	facebook: {
		clientID: 'Application ID',
		clientSecret: 'Application Secret',
		callbackURL: 'http://localhost:3000/oauth/facebook/callback'
	},
	// get application id and secret from twitter and facebook api
	twitter:{
		clientID: 'Application Id',
		clientSecret: 'Application Secret',
		callbackURL: 'http://localhost:3000/oauth/twitter/callback'
	},
	google: {
       clientID: 'Application Id',
       clientSecret: 'Application Secret',
       callbackURL: 'http://localhost:3000/oauth/google/callback'
	}
};