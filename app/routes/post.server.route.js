var poster = require('../controllers/poster.server.controller.js'),
	post = require('../controllers/post.server.controller.js');

module.exports = function(app){
	app.route('/api/post').get(post.list).post(poster.authorized, post.create);
	app.route('/api/post/:postId').get(post.read).put(poster.authorized, post.authorized, post.update)
	.delete(poster.authorized, post.authorized, post.delete);
	app.param('postId', post.post_by_id);
}