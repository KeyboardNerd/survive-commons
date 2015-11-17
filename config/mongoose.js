var config = require('./config'), mongoose = require('mongoose');
// link sheme 
module.exports = function(){
	var db = mongoose.connect(config.db);
	require('../app/models/post.server.model.js'); 
	require('../app/models/poster.server.model.js'); // can i delete these two lines?
	return db;
}