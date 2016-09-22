var Sequelize = require('sequelize');
var db = require('./_db');

var User = db.define('User', { 
	name: Sequelize.STRING,
	hugCount: Sequelize.INTEGER,
	hugsRemaining: Sequelize.INTEGER
},{
	instanceMethods: {
		useHug: function(){
			this.hugCount++;
			this.hugsRemaining--; 
			this.save()
			.then(function(user){
				return user; 
			})
		}
	}
})

module.exports = User; 