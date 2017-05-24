'use strict';
let sessionManager = require('../../../sessionManager');
let db = require('../../../../../db');
let God = db.model('God');
let GodInfo = db.model('GodInfo');


module.exports = async function(){
	//First we need to acquire all of the gods from the smiteAPI
	let system = 'xbox';
	let method = 'getgods';
	let additionalData = {
		languageCode: 1
	}; 
	let gods = await sessionManager.makeRequest(system, method, 'Json', additionalData);

	var newGods = [];
	for(var i = 0; i < gods.length; i++){
		var god = await God.create({
			name: gods[i].Name,
			smite_id: gods[i].id 
		})
		var godInfo = await GodInfo.create({
			patchNumber: 4,
			info: gods[i],
			GodId: god.id
		})
	}

	console.log('process complete', gods.map(god => god.Name));
}