var users = require('../controllers/users.server.controller');
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

};
