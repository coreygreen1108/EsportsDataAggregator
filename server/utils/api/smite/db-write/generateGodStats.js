'use strict';
let sessionManager = require('../../../sessionManager');
let db = require('../../../../../db');
let God = db.model('God');
let GodInfo = db.model('GodInfo');
let GodPlayerStats = db.model('GodPlayerStats');
let Entry = db.model('Entry');

module.exports = async function(queueNum,date,hour){
	let startTime = new Date();
	//First we need to acquire all of the gods from the smiteAPI
	let system = 'xbox';
	let method = 'getmatchidsbyqueue';
	let additionalData = {
		queue: queueNum || '451',
		date: date || '20170523',
		hour: hour || '5'
	}; 
	console.log(queueNum, date, hour);
	let queueStartMarker = new Date(); 
	let queue = await sessionManager.makeRequest(system, method, 'Json', additionalData);
	queue = queue.filter(game => game.Active_Flag == 'n').map(game => game.Match); 
	console.log('queue filtering stop', new Date() - queueStartMarker);
	//assemble base object
	let godAssembleTime = new Date();
	let godObj = {};
	let gods = await God.findAll();
	gods.forEach(god => {
		godObj[god.smite_id] = {
			meta: {
				name: god.name,
				id: god.id
			},
		  	timesBanned: 0,
			wins: 0,
			losses: 0,
			kills: {

			},
			deaths: 0,
			assists: 0,
			damage: {

			},
			timesSurrendered: 0,
			goldEarned: 0,
			goldPerMinute: 0,
			finalLevel: 0,
			structureDamage: 0,
			campsCleared: 0,
			wardsPlaced: 0,
			towersDestroyed: 0,
			items: {
			},
			relics: {
			},
			totalTime: 0,
		}
	});
	console.log('God Object Assembly time stamp', new Date() - godAssembleTime)
	
	//create an entry for the queue of matches in question. 
	let entry = await Entry.create({
		numberOfGames: queue.length,
		matchIds: queue.map(match => +match),
		gameWindowDate: date,
		gameWindowHour: hour
	});

	console.log('NUMBER OF GAMES', queue.length);
	console.log('TOTAL TIME OF SETUP FOR MAIN', new Date() - startTime)
	//go through queue of matches one by one. 
	let keyConverter = null; 
	for(let i = 0; i < 10; i++){
		let matchId = queue[i];
		let gameTimer = new Date();
		console.log('Game', i); 
		let gameInfo = await sessionManager.makeRequest(system, 'getmatchdetails', 'Json', {match_id: matchId});
		
		//go through each game by player, add up player stats. 
		gameInfo.forEach(player => {
			let god = godObj[player.GodId];
			if(!keyConverter){
				keyConverter = {}; 
				let availableData = Object.keys(player);
				availableData.forEach(key => {
					keyConverter[key] = (key[0].toLowerCase() + key.slice(1)).replace(/_/g, ''); 
				})
				//special overrides for renaming keys
				keyConverter.Time_In_Match_Seconds = 'totalTime';
			}

			//Default Data Relationship Handler
			for(let k in keyConverter){
				//console.log(k, keyConverter[k], god.hasOwnProperty[keyConverter[k]]);
				if(god.hasOwnProperty(keyConverter[k])){
					god[keyConverter[k]] += player[k];
				} else if(god.hasOwnProperty(keyConverter[k].replace(/[A-Z].*/, ''))){
					let mainKey = keyConverter[k].replace(/[A-Z].*/, '');
					let secondKey = keyConverter[k].slice(mainKey.length);
					god[mainKey][secondKey] = god[mainKey][secondKey] + player[k] || player[k];
				} else {
					delete keyConverter[k];
				}
			}
		
			//Complex Data Relationship Handler
			if(god.Win_Status === 'Winner') god.wins++;
			else god.losses++; 

			if(Number(player.Surrendered)) god.timesSurrendered++; 

		}); 
		console.log(i, 'time for gameObj updates', new Date() - gameTimer)

		//take one player from game, and use info to affect ban stats. 
		let player = gameInfo[0];
		for(let i = 1; i <= 10; i++){
			if(player[`Ban${i}Id`]){
				godObj[player[`Ban${i}Id`]].timesBanned++;
			}
		}
		console.log(i, 'time for ban gameObj updates', new Date() - gameTimer)
	}
	console.log('COMPLETION OF GAMEOBJ UPDATING', new Date() - startTime);
	
	//go through all gods and create entries. 
	for(let godId in godObj){
		let meta = godObj[godId].meta;
		delete godObj[godId].meta; 
		let god = GodPlayerStats.build(godObj[godId]);
		god.GodId = meta.id;
		god.EntryId = entry.id; 
		await god.save();
	}

	console.log('TOTAL TIME', new Date() - startTime);
}
