// used for routing the request to post
var Post = require('../controller/post.server.controller'),
    Poster = require('../controller/poster.server.controller');

module.exports = function(app){
    app.route('/api/post/:postId')
	.get(Post.read)
	.put(Post.update)
	.delete(Post.delete);    
    app.param('postId', Post.post_by_id);
    app.route('/api/post_list/')
	.get(Post.list)
	.post(Post.create);
}
