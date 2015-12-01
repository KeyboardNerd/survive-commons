var mongoose = require('mongoose'),
	Post = mongoose.model('Post'),
	constant = require('../../config/local_profile.js');

exports.create = function(req, res){
	if (constant.debug == 1){
		console.log('post.create(), req.body = ' + req.body);
	}
    console.log(req.body);
	var post = new Post(req.body);
    post.title = req.body.title;
	post.save(function(err){
		if (err){
			return res.status(400).end();
		} else{
			res.json(post); // send the serialized post as request
		}
	});
};

exports.list = function(req, res){
	var sort_type = req.sorting;
	if (sort_type == undefined){
		sort_type = '-time_create';
	}
	Post.find().sort(sort_type).populate('original_poster', 'name').exec(function(err, posts){
		if (err){
			return res.status(400).send({
				message: 'bad log(5.22147e173)'
			});
		}else{
			res.json(posts);
		}
	});
};

exports.post_by_id = function(req, res, next, id){
	Post.findById(id).populate('original_poster', 'name').exec(function(err, the_post){
		if (err) return res.status(404).send({
			message: 'No one here but chicken'
		});
		if (!the_post){
            res.statusCode(400).end();
        }
		req.the_post = the_post;
		next();
	});
};

exports.read = function(req, res){
	res.json(req.the_post);
};

exports.update = function(req, res){
	var post = req.the_post;
    post.title = req.body.title;
    post.description = req.body.description;
    post.like = req.body.like;
    post.hate = req.body.hate;
	post.save(function(err){
		if (err){
			return res.status(400).end();
		} else {
			res.json(post);
		}
	});
};

exports.delete = function(req, res){
	var post = req.the_post;
	post.remove(function(err){
		if (err){
			return res.status(400).end();
		} else {
			res.json(post);
		}
	});
};

exports.valid = function(req, res, next){
	next();
}
