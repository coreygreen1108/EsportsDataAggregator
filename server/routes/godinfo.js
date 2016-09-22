'use strict';

let router = require('express').Router();
let generateUrl = require('../utils/generateUrl');
let request = require('request-promise');
let sessionManager = require('../utils/sessionManager');

module.exports = router; 

router.get('/:system/:type/:target', function(req, res){
	console.log('we made it!');
	let system = req.params.system;
	let type = req.params.type;
	let target = req.params.target; 
	console.log(system, type, target);
	sessionManager.makeRequest(system, type, 'Json', target)
	.then(function(info){
		//res.send(info);
		//console.log(info);
		// res.send(info);
		// res.send(info.map(god => {
		// 	return {name: god.god, kda: ((god.Kills) / god.Deaths), gameTotal: god.Wins + god.Deaths};
		// }));
		// let cupid = info.filter(god => god.God === 'Cupid'); 
		// // let kdOnly = cupid.map(god => {
		// // 	return {
		// // 		name: god.God,
		// // 		kd: god.Kills / god.Deaths
		// // 	}
		// // })
		// // res.send(kdOnly);
		// let kills = 0;
		// let deaths = 0; 
		// cupid.forEach(function(elem){
		// 	kills += elem.Kills; 
		// 	deaths += elem.Deaths;
		// })
		// console.log(kills);
		// console.log(deaths); 
		// let kd = (kills / deaths) + '';
		// //let kdOnly = cupid.reduce((prev,next) => prev + next.Kills);
		// res.send(kd);
		let kpgInfo = info.map(god => {
			return {
				name: god.god,
				kpg: god.Kills / (god.Wins + god.Losses),
				gamesPlayed: god.Wins + god.Losses
			}
		})
		res.send(kpgInfo); 

	})
	.catch(function(err){
		console.log('ERROR', err);
	})
})