// every file io will go through here.
var method = FileIO.prototpye;
var crypto = require('crypto');
var default_algorithm = 'aes-256-ctr';
var fs = require('fs');

module.exports = FileIO;

function FileIO(encryptMethod){
    this._em = typeof encryptMethod !== 'undefined' ? encryptMethod : default_algorithm;
}

method.setMethod = function(algo){
    this._em = typeof algo !== 'undefined' ? algo : this._em;
}
method.read = function(path, encoding){
    fs.readFile(path, encoding, function(err, data){
	if (err){
	    return console.log(err);
	}
	
	return data;
    });
};

method.write = function(path, data, encoding, method){
    fs.writeFile(path, data, encoding, function(err){
	if (err) return console.log(err);
    });
};


