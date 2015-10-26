var User = require('mongoose').model('User');
exports.create = function(req, res, next){ // what's exports.create
	var user = new User(req.body); // wat
	user.save(function(err){
		if (err){
			return next(err); // what
		} else{
			res.json(user); // what json
		}
	});
}