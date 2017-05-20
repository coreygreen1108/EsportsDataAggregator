'use strict';

let router = require('express').Router();
let request = require('request-promise');
let sessionManager = require('../../utils/sessionManager');
let updateGodApiInterface = require('../../utils/updateGodModel');

module.exports = router; 

router.get('/updateGods', (req, res) => {
	updateGodApiInterface().then(function(){
		res.send('Process Complete');
	})
	.catch(function(err){
		console.log('ERROR', err);
	})
})

router.get('/:system/:method', (req, res) => {
	console.log('prove lee that this was hit when we gave system and method')
	let system = req.params.system;
	let method = req.params.method;
	let additionalData = req.query; 
	sessionManager.makeRequest(system, method, 'Json', additionalData)
	.then(function(info){
		res.send(info);
	})
	.catch(function(err){
		console.log('ERROR', err);
	})
});
