var post = require('../controllers/post.server.controller.js'),
	errordir = require('../controllers/errordir.server.controllers.js'),
	index = require('../controllers/index.server.controller.js');

module.exports = function(app){
    app.get('/',index.authorized, post.list, index.render);
};
