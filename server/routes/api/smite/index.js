'use strict';

let router = require('express').Router();
let request = require('request-promise');
let sessionManager = require('../../../utils/sessionManager');
let updateGodApiInterface = require('../../../utils/api/smite/db-write/updateGodModel');
let updateStats = require('../../../utils/api/smite/db-write/generateGodStats');

module.exports = router;

router.get('/updateGods', (req, res) => {
	updateGodApiInterface().then(function(){
		res.send('Process Complete');
	})
	.catch(function(err){
		console.log('ERROR', err);
	});
});

router.get('/updateStats/:queue/:date/:hour', (req, res) => {
	updateStats(req.params.queue,req.params.date,req.params.hour).then(function(){
		res.send('Process Complete');
	})
	.catch(function(err){
		console.log('ERROR', err);
	});
});

router.get('/:system/:method', (req, res) => {
	let system = req.params.system;
	let method = req.params.method;
	let additionalData = req.query;
	sessionManager.makeRequest(system, method, 'Json', additionalData)
	.then(function(info){
		res.send(info);
	})
	.catch(function(err){
		console.log('ERROR', err);
	});
});

