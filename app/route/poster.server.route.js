'use strict'
var Poster = require('../controller/poster.server.controller');
module.exports = function(app){
    app.route('/api/:posterId', Poster.read);
    app.param('posterId', Poster.poster_by_id);
}