'use strict';

let router = require('express').Router();
let generateUrl = require('../utils/generateUrl');
let request = require('request-promise');
let sessionManager = require('../utils/sessionManager');

module.exports = router; 

router.get('/:system/:type/:target', function(req, res){
	let system = req.params.system;
	let type = req.params.type;
	let target = req.params.target; 
	console.log(system, type, target);
	sessionManager.makeRequest(system, type, 'Json', target)
	.then(function(info){
		res.send(info);
	})
	.catch(function(err){
		console.log('ERROR', err);
	})
})