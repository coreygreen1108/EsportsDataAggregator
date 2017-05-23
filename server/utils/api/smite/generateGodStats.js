'use strict';
let sessionManager = require('../../../utils/sessionManager');
let db = require('../../../../db');
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
	})

	console.log('NUMBER OF GAMES', queue.length);
	//go through queue of matches one by one. 
	for(let i = 0; i < queue.length ; i++){
		let matchId = queue[i];
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
			if(!player[`Ban${i}Id`]) continue;
			//let ban = await God.findOne({where: {smite_id: player[`Ban${i}Id`]}});
			godObj[player[`Ban${i}Id`]].timesBanned++;
			// if(godObj[ban.Name])
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

// { Account_Level: 30,
//   ActiveId1: 14157,
//   ActiveId2: 7672,
//   Assists: 12,
//   Ban1: 'Cernunnos',
//   Ban10: '',
//   Ban10Id: 0,
//   Ban1Id: 2268,
//   Ban2: 'ChangE',
//   Ban2Id: 1921,
//   Ban3: 'Ravana',
//   Ban3Id: 2065,
//   Ban4: 'Susano',
//   Ban4Id: 2123,
//   Ban5: 'Odin',
//   Ban5Id: 1669,
//   Ban6: 'Thanatos',
//   Ban6Id: 1943,
//   Ban7: 'Bellona',
//   Ban7Id: 2047,
//   Ban8: 'Hun_Batz',
//   Ban8Id: 1673,
//   Ban9: '',
//   Ban9Id: 0,
//   Camps_Cleared: 5,
//   Conquest_Losses: 11,
//   Conquest_Points: 61,
//   Conquest_Tier: 17,
//   Conquest_Wins: 13,
//   Damage_Bot: 77577,
//   Damage_Done_In_Hand: 4263,
//   Damage_Done_Magical: 102448,
//   Damage_Done_Physical: 0,
//   Damage_Mitigated: 14183,
//   Damage_Player: 24871,
//   Damage_Taken: 21443,
//   Damage_Taken_Magical: 7845,
//   Damage_Taken_Physical: 12298,
//   Deaths: 9,
//   Distance_Traveled: 457569,
//   Duel_Losses: 0,
//   Duel_Points: 0,
//   Duel_Tier: 0,
//   Duel_Wins: 0,
//   Entry_Datetime: '5/22/2017 12:00:23 AM',
//   Final_Match_Level: 20,
//   First_Ban_Side: 'Winner',
//   GodId: 1958,
//   Gold_Earned: 15261,
//   Gold_Per_Minute: 508,
//   Healing: 0,
//   Healing_Bot: 0,
//   Healing_Player_Self: 2120,
//   ItemId1: 8540,
//   ItemId2: 7641,
//   ItemId3: 9634,
//   ItemId4: 7594,
//   ItemId5: 7832,
//   ItemId6: 9861,
//   Item_Active_1: 'Teleport Glyph Upgrade',
//   Item_Active_2: 'Aegis Amulet',
//   Item_Active_3: '',
//   Item_Purch_1: 'Bulwark of Hope',
//   Item_Purch_2: 'Breastplate of Valor',
//   Item_Purch_3: 'Shoes of Focus',
//   Item_Purch_4: 'Gem of Isolation',
//   Item_Purch_5: 'Divine Ruin',
//   Item_Purch_6: 'Restored Artifact',
//   Joust_Losses: 0,
//   Joust_Points: 0,
//   Joust_Tier: 0,
//   Joust_Wins: 0,
//   Killing_Spree: 2,
//   Kills_Bot: 162,
//   Kills_Double: 0,
//   Kills_Fire_Giant: 0,
//   Kills_First_Blood: 0,
//   Kills_Gold_Fury: 0,
//   Kills_Penta: 0,
//   Kills_Phoenix: 0,
//   Kills_Player: 4,
//   Kills_Quadra: 0,
//   Kills_Siege_Juggernaut: 0,
//   Kills_Single: 4,
//   Kills_Triple: 0,
//   Kills_Wild_Juggernaut: 0,
//   Mastery_Level: 73,
//   Match: 121537194,
//   Minutes: 30,
//   Multi_kill_Max: 1,
//   Objective_Assists: 5,
//   PartyId: 1533923,
//   Rank_Stat_Conquest: 0,
//   Rank_Stat_Duel: 0,
//   Rank_Stat_Joust: 0,
//   Reference_Name: 'Nu_Wa',
//   Region: 'North America',
//   Skin: 'Amethyst',
//   SkinId: 9530,
//   Structure_Damage: 2371,
//   Surrendered: 0,
//   TaskForce: 1,
//   Team1Score: 0,
//   Team2Score: 0,
//   TeamId: 157997,
//   Team_Name: 'BradMcdowell',
//   Time_In_Match_Seconds: 1818,
//   Towers_Destroyed: 0,
//   Wards_Placed: 0,
//   Win_Status: 'Winner',
//   Winning_TaskForce: 1,
//   hasReplay: 'n',
//   name: 'Ranked: Conquest',
//   playerId: '5752',
//   playerName: '[Braad]El Mondongito',
//   ret_msg: null }

// godObj = {
// 	"agni": {

// 	}
// }

// godObj['bellona'] = godObj['bellona'] ? godObj['bellona'] : {} 