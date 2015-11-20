var Poster = require('mongoose').model('Poster'),
crypto = require('crypto');

exports.create = function(req, res){
	if (!req.cookies.poster_cookie){
		var poster = new Poster(req.body);
		poster.save(function(err){
			if (err){
				return res.redirect('/error');
			}
		});
	}
};

//x--
exports.list = function(req, res){
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
	res.json(req.posters);
};
//x--
exports.valid = function(req, res, next){
    next();
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
            res.statusCode(500).end();
		}else{
            res.statusCode(200).end();
		}
	})
};
//x--
exports.delete = function(req, res){
	req.poster.remove(function(err){
		if (err){
            console.log('poster.server.controller:delete is failed');
		} else {
            res.statusCode(200).end();
		}
	});
};