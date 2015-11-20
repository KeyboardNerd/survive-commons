'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var mongoose = require('./config/mongoose'),
	express = require('./config/express');

    var db = mongoose(); 
    console.log('database connection failed');
var app = express(); 
app.listen(3000);
console.log('Server running at http://localhost:3000/');
module.exports = app;// to be used with other modules.