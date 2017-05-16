'use strict';

let router = require('express').Router();
let request = require('request-promise');
let sessionManager = require('../utils/sessionManager');

module.exports = router; 

router.get('/:system/:method', (req, res, next) => {
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