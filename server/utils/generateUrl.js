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
	// targetName = '426/' + date + '/20'
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


// {
// "Active_Flag": "y",
// "Match": "120076634",
// "ret_msg": null
// },
// {
// "Active_Flag": "y",
// "Match": "120078527",
// "ret_msg": null
// },
// {
// "Active_Flag": "y",
// "Match": "120079421",
// "ret_msg": null
// },
// {
// "Active_Flag": "y",
// "Match": "120081414",
// "ret_msg": null
// },