'use strict';
let sessionManager = require('../../../sessionManager');
let db = require('../../../../../db');
let God = db.model('God');
let GodInfo = db.model('GodInfo');


module.exports = async function(patchNumber = 4.9){
	//First we need to acquire all of the gods from the smiteAPI
	let system = 'xbox';
	let method = 'getgods';
	let additionalData = {
		languageCode: 1
	}; 
	let gods = await sessionManager.makeRequest(system, method, 'Json', additionalData);

	let newGods = [];
	for(let i = 0; i < gods.length; i++){
		let god = await God.findOne({where: {
			name: gods[i].Name,
			smite_id: gods[i].id
		}});
		if(!god){
			god = await God.create({
				name: gods[i].Name,
				smite_id: gods[i].id 
			})
			console.log('NEW GOD CREATED', god.name);
		}
		let godInfo = await GodInfo.create({
			patchNumber: patchNumber,
			info: gods[i],
			GodId: god.id
		})
	}

	console.log('process complete');
}