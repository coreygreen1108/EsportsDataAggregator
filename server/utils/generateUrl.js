'use strict';
var md5 = require('crypto-md5');
const env = require('../env/development.js');
const devId = env.SMITE.devId; 
const authKey = env.SMITE.accessKey;

function parseDate(date){
	let newDate = date.toISOString().replace(/[-:,TZ]/g, '');
	newDate = newDate.slice(0, newDate.length - 4); 
	return newDate; 
}

function createUrl(session, system, command = 'createsession', type = 'Json', targetName){
	var d = new Date();
	let currentTime = parseDate(d);
	let date = currentTime.slice(0, 8);
	console.log(d, currentTime, date);
	const signature = md5(devId + command + authKey + currentTime, 'hex');

	if(!arguments.length) return ("http://api.xbox.smitegame.com/smiteapi.svc/createsessionJson/" + devId + '/' + signature + '/' + currentTime);
	let url = "http://api.xbox.smitegame.com/smiteapi.svc/" + command + type + '/'
		+ devId + '/' 
		+ signature + '/' 
		+ session + '/' 
		+ currentTime;
	if(targetName) url += ('/' + targetName);
	if(command === 'getmatchidsbyqueue'){
		url += ('/' + date + '/' + (Number(currentTime.slice(8, 10)) - 2));
	} else if(command === 'getgods'){
		url += ('/1');
	}
	console.log('date', date);
	console.log('url', url);
	return url; 
}

module.exports = createUrl; 