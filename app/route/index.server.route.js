var render = require('../controller/render.server.controller');
module.exports = function(app){
    app.get('/', render.renderIndex);
};