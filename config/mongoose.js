var config = require('./config'), mongoose = require('mongoose');
module.exports = function(){
	var db = mongoose.connect(config.db);
	require('../app/models/user.server.model'); // link the schema file in user.server.model to the app
	require('../app/models/article.server.model');
	return db;
}