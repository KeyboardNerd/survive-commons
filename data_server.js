var http = require('http');

var IP = "127.0.0.1";
var port = 5800;
var db = require('mysql');

var db_connection = db.createConnection({
});

connection.connect(function (err) {
    if (err != null){
	console.log('Data Server Connection failed' + err);
    }
});
// dataserver connection
http.createServer(function (req, res){
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.end('Hello World\n');
}).listen(port, IP);
console.log('Server running at ' + IP);

