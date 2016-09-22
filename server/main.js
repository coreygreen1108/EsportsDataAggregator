'use strict';

let express = require('express');
let server = express();
//let db = require('./db');
//let User = require('./db/user.model');


server.listen(8080, function(req, res){
		console.log('dis server is live on port 8080 maaannnn (Jamaican accent)')
});

server.use('/', express.static(__dirname + '/../public'));

server.use('/godinfo', require('./routes/godinfo'));

server.get('/', function(req, res){
	res.render('index.html');
})
