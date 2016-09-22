var Promise = require('bluebird');
var db = require('./db');
var User = require('./db/user.model');

db.sync({force: true})
.then(function () {
	return User.create({
		name: 'Chloe', 
		hugCount: 0,
		hugsRemaining: 100
	})
}).then(function(user){
	console.log(user.name + ' has successfully been created');
})