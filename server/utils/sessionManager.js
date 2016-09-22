'use strict';

let generateUrl = require('./generateUrl.js');
let request = require('request-promise');
let manager = {};
const sessionMax = 895000; 

manager.currentSession = null; 

manager.createSession = function(){
	return request({url: generateUrl(), json: true})
	.then(function(res){
		if(res.ret_msg === 'Approved') {
			manager.currentSession = res.session_id;
			return manager.currentSession; 
		} 
	})
}

manager.makeRequest = function(system, type, output, target){
	if(!manager.currentSession){
		return manager.createSession()
		.then(function(sessionId){
			manager.sessionTimer(); 
			return request({url: generateUrl(manager.currentSession, system, type, output, target), json: true});
		})
	} else {
		return request({url: generateUrl(manager.currentSession, system, type, output, target), json: true}); 
	}
}

manager.sessionTimer = function(){
	setTimeout(function(){ 
		manager.currentSession = null; 
	}, sessionMax);
}

module.exports = manager; 
