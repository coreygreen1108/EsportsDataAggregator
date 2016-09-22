'use strict';
var md5 = require('crypto-md5');
const env = require('../env/development.js');

function createUrl(session, system, command = 'createsession', type = 'Json', targetName){
	
	function parseDate(date){
		let newDate = date.replace(/[-:,TZ]/g, '');
		newDate = newDate.slice(0, newDate.length - 4); 
		return newDate; 
	}

	const devId = env.SMITE.devId; 
	const authKey = env.SMITE.accessKey;
	let currentTime = parseDate(new Date().toISOString());

	const signature = md5(devId + command + authKey + currentTime, 'hex');

	if(!arguments.length) return ("http://api.xbox.smitegame.com/smiteapi.svc/createsessionJson/" + devId + '/' + signature + '/' + currentTime);
	let url = "http://api.xbox.smitegame.com/smiteapi.svc/" + command + type + '/'
		+ devId + '/' 
		+ signature + '/' 
		+ session + '/' 
		+ currentTime;
	if(targetName) url += ('/' + targetName); 
	return url; 
	// return ("http://api.xbox.smitegame.com/smiteapi.svc/" + command + type + '/'
	// 	+ devId + '/' 
	// 	+ signature + '/' 
	// 	+ session + '/' 
	// 	+ currentTime + '/' 
	// 	+ targetName); 
}

module.exports = createUrl; 