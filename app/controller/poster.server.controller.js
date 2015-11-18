var Poster = require('mongoose').model('Poster'),
crypto = require('crypto');

exports.create = function(req, res, next){
	console.log('poster.server.controller: create is called');
	if (!req.cookies.poster_cookie){
		var poster = new Poster(req.body);
		poster.cookie = crypto.pbkdf2Sync(, this.salt, 10000, 64).toString('base64');
		poster.save(function(err){
			if (err){
				return res.redirect('/error');
			}
			// successfully saved, and set a cookie as the credential
			res.cookie('poster_cookie',poster.cookie);
			next();
		});
	}
	next();
};

//x--
exports.list = function(req, res){
	console.log('poster.server.controller: list is called');
	Poster.find({},'_id name cookie', function(err, array_poster){
		if (err){
			return next(err);
		} else {
			res.json(array_poster);// return the json representation of array_poster, which is all posters
		}
	});
}
//x--
exports.read = function(req, res){
	console.log('poster.server.controller: read is called');
	res.json(req.posters);
};
//x--
exports.valid = function(req, res){
	if (!req.cookies.poster_cookie) {req.poster_valid = 0; next();}
	else Poster.findOne({cookie: req.cookies.poster_cookie}, function(err, poster){
		if (err){
			// nothing is found:
			req.poster_valid = 0;
			next();
		} else {
			req.poster_valid = 1;
			next();
		}
	});
}
//x--
exports.poster_by_id = function(req, res, next, id){
	console.log('poster.server.controller: poster_by_id');
	Poster.findOne({
		_id: id
	}, function(err, poster){
		if (err){
			return next(err);
		} else {
			req.poster = poster;
			next();
		}
	})
}
//x--
exports.update = function(req, res){
	console.log('poster.server.controller: update is called');
	Poster.findByIdAndUpdate(req.posters.id, req.body, function(err, user){
		if (err){
			console.log('poster.server.controller: update is failed');
			return next(err);
		}else{
			res.json(user);
		}
	})
};
//x--
exports.delete = function(req, res){
	console.log('poster.server.controller: delete is called');
	req.poster.remove(function(err){
		if (err){
			return next(err);
		} else {
			res.json(req.user);
		}
	});
};