'use strict';
let sessionManager = require('../../../sessionManager');
let db = require('../../../../../db');
let God = db.model('God');
let GodInfo = db.model('GodInfo');
let GodPlayerStats = db.model('GodPlayerStats');
let Entry = db.model('Entry');

module.exports = async function(a,b,c){
	let startTime = new Date();
	//First we need to acquire all of the gods from the smiteAPI
	let system = 'xbox';
	let method = 'getmatchidsbyqueue';
	let additionalData = {
		queue: a || '451',
		date: b || '20170521',
		hour: c || '5'
	}; 
	console.log(a, b, c);
	let queue = await sessionManager.makeRequest(system, method, 'Json', additionalData);
	queue = queue.filter(game => game.Active_Flag == 'n').map(game => game.Match); 

	//assemble base object
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
			damageStats: {},
			kills: 0,
			deaths: 0,
			assists: 0,
			goldEarned: 0,
			goldEarnedPerMin: 0,
			finalLevel: 0
		}
	});

	//create an entry for the queue of matches in question. 
	let entry = await Entry.create({
		numberOfGames: queue.length,
		matchIds: queue.map(match => +match)
	});

	console.log('NUMBER OF GAMES', queue.length);
	//go through queue of matches one by one. 
	for(let i = 0; i < queue.length ; i++){
		let matchId = queue[i];
		let gameTimer = new Date();
		console.log('Game', i); 
		let gameInfo = await sessionManager.makeRequest(system, 'getmatchdetails', 'Json', {match_id: matchId});
		
		//go through each game by player, add up player stats. 
		gameInfo.forEach(player => {
			let god = godObj[player.GodId];
			player.Win_Status === 'Winner' ? god.wins++ : god.losses++
			god.kills += player.Kills_Player;
			god.assists += player.Assists;
			god.deaths += player.Deaths;
			god.goldEarned += player.Gold_Earned; 
			god.goldEarnedPerMin += player.Gold_Per_Minute;
			god.finalLevel += player.Final_Match_Level;
		}); 

		//take one player from game, and use info to affect ban stats. 
		let player = gameInfo[0];
		for(let i = 1; i <= 10; i++){
			if(player[`Ban${i}Id`]){
				godObj[player[`Ban${i}Id`]].timesBanned++;
			}
		}
	}

	for(let godId in godObj){
		let meta = godObj[godId].meta;
		delete godObj[godId].meta; 
		let god = GodPlayerStats.build(godObj[godId]);
		god.GodId = meta.id;
		god.EntryId = entry.id; 
		await god.save();
	}
	//go through all gods and create entries. 

	console.log('TOTAL TIME', new Date() - startTime);
}
