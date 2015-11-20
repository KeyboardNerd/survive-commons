var config = require('./config'), 
  mongoose = require('mongoose');
// link sheme 
module.exports = function(){
    var db;
    try{
        db = mongoose.connect(config.db);
    } catch(err){
        throw err;
    }
	// load the module into the mongoose, notice that load function is called within post.server.model!!!!!
	require('../app/model/post.server.model.js'); 
	require('../app/model/poster.server.model.js');	
	return db;
}