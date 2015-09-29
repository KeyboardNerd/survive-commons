var http = require('http');
var db_host = '45.63.4.119';
var db_user = 'work';
var db_pw = 'csd91146';

var IP = "127.0.0.1";
var port = 5800;
var db = require('mysql');

var db_connection = db.createConnection({
    host:'45.63.4.119',
    user:'work',
    password:'csd91146',
    database : 'TEST'
});

connection.connect(function (err) {
    if (err != null){
	console.log('Data Server Connection failed' + err);
    }
});

http.createServer(function (req, res){
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.end('Hello World\n');
}).listen(port, IP);
console.log('Server running at ' + IP);

