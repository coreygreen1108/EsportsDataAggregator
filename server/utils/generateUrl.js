'use strict';
var md5 = require('crypto-md5');
const env = require('../env/development.js');
const devId = env.SMITE.devId; 
const authKey = env.SMITE.accessKey;
const defaultData = require('./smiteAPIDefaultMethodData');

function parseDate(date){
	let newDate = date.toISOString().replace(/[-:,TZ]/g, '');
	newDate = newDate.slice(0, newDate.length - 4); 
	return newDate; 
}

function createUrl(session, system, command = 'createsession', type = 'Json', additionalData){
	var d = new Date();
	let currentTime = parseDate(d);
	let date = currentTime.slice(0, 8);
	const signature = md5(devId + command + authKey + currentTime, 'hex');

	if(!arguments.length) return ("http://api.xbox.smitegame.com/smiteapi.svc/createsessionJson/" + devId + '/' + signature + '/' + currentTime);
	let url = "http://api.xbox.smitegame.com/smiteapi.svc/" + command + type + '/'
		+ devId + '/' 
		+ signature + '/' 
		+ session + '/' 
		+ currentTime;

	if(additionalData && defaultData[command]){
		defaultData[command].format.forEach(elem => {
			url += ('/' + additionalData[elem]);
		})
	}

	return url; 
}

module.exports = createUrl; 