var mongoose = require('mongoose'),
	Post = mongoose.model('Post'),
	constant = require('../../config/constants.js');

// handle mongoose err
var getErrorMessage = function(err){
	if (err.errors){ 
		for (var errName in err.errors){
			if (err.errors[errName].message) return err.errors[errName].message;
		}
	} else{
		return 'Unknown server error';
	}
};
/*

*/
exports.create = function(req, res){
	if (constant.debug == 1){
		console.log('post.create(), req.body = ' + req.body);
	}
	var post = new Post(req.body); // wrap the pack in client side or 
	post.creator = req.poster;
	post.save(function(err){
		if (err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else{
			res.json(post); // send the serialized post as request
		}
	});
};

// readers:

// retrieve a list of all articles
exports.list = function(req, res){
	Post.find().sort('-time_create').populate('original_poster', 'name').exec(function(err, posts){
		if (err){
			return res.status(400).send({
				message: 'bad log(5.22147e173)'
			});
		}else{
			res.json(posts);
		}
	});
};

// get a post
exports.post_by_id = function(req, res, next, id){
	Post.findById(id).populate('original_poster', 'name').exec(function(err, a_post){
		if (err) return res.status(400).send({
			message: 'No one here but chicken'
		});
		if (!a_post) return next(new Error('Failed to load the post ' + id));
		req.post = post;
		next();
	});
};
// get a post from req to res
exports.read = function(req, res){
	res.json(req.post);
};

// modifier can be optimized
exports.update = function(req, res){
	var post = req.post;
	post.title = req.body.title;
	post.time_create = req.body.time_create;
	post.description = req.body.description;
	if (constant.debug == 1){ 
		if (post.original_poster != req.body.original_poster){
			console.log('damned!, something fishy happens');
		}
	}
	post.pic = req.body.pic;
	post.like = req.body.like;
	post.hate = req.body.hate;
	post.save(function(err){
		if (err){
			return res.status(400).send({
				message:getErrorMessage(err)
			});
		} else {
			res.json(post);
		}
	});
};

exports.delete = function(req, res, next){
	var post = req.post;
	post.remove(function(err){
		if (err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(post);
			next();
		}
	});
};


exports.authorized = function(req, res, next){
	if (req.post.creator._id !== req.user._id){
		return res.status(403).send({
			message: 'I don know u'
		});
	}
	next();
}