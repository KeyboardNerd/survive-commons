var mongoose = require('mongoose'),
	Article = mongoose.model('Article');

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

exports.create = function(req, res){
	var article = new Article(req.body);
	article.creator = req.user; // link creator to user, req.user is assigned by middleware
	article.save(function(err){
		if (err){
			return res.status(400).send({
				message:getErrorMessage(err)  // obviously the err is from mongoose save
			});
		} else{
			res.json(article);
		}
	})
};
// retrive a list of articles sorted by '-created' field 
// populate: add some user fields to the creator property of the articles objects
// what is sort?
// what is exec
exports.list = function(req, res){
	Article.find().sort('-created').populate('creator', 'firstName lastName fullName').exec(function(err, articles){
		if (err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(articles);
		}
	});
};

// whatever: Since you're writing a sort of a RESTful API, the common usage of this method will be handled by passing the article's ID field as a route parameter. 
exports.articleByID = function(req, res, next, id) {
	// where findById is defined?
	// 
	Article.findById(id).populate('creator','firstName lastName fullName').exec(function(err, article){
		if(err) return next(err); // use next because it's a middleware
		if (!article) return next(new Error('Failed to load article ' + id));
		req.article = article;
		next();
	})
};

exports.read = function(req, res){
	res.json(req.article); // article is obtained in articleByID middleware
};

exports.update = function(req, res){
	var article = req.article;
	article.title = req.body.title;
	article.content = req.body.content;
	article.save(function(err){
		if (err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else{
			res.json(article);
		}
	});
};

exports.delete = function(req, res, next){
	var article = req.article;
	article.remove(function(err){ // mongoose model's remove() method, and output the deleted article
		if (err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else{
			res.json(article);
			next();
		}
	});
};
// middleware
exports.hasAuthorization = function(req, res, next){
	if (req.article.creator.id !== req.user.id){
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
}