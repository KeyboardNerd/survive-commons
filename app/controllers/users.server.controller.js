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