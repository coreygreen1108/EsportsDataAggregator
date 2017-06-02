'use strict';

let express = require('express');
let server = express();
let db = require('../db');
const path = require('path');

db.sync(/*{force: true}*/)
.then(function(){
	return server.listen(8080);
}).then(function(){
	console.log('dis server is live on port 8080 maaannnn (Jamaican accent)');
});


server.use('/', express.static(__dirname + '/../public'));

//server.use('/godinfo', require('./routes/godinfo'));

server.use('/api', require('./routes/api'));

// server.use('/matchinfo', require('./routes/matchinfo'));

server.get('/*', function(req, res){
  res.sendFile(path.join(__dirname + '/../public', 'index.html'));
});
