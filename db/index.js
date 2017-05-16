const db = require('./_db');

const God = require('./models/God');
const GodPlayerStats = require('./models/GodPlayerStats');
const Entry = require('./models/Entry');
const GodInfo = require('./models/GodInfo');

// only need one?
// God.hasMany(GodInfo);
// God.hasMany(GodPlayerStats);

GodInfo.belongsTo(God);
GodPlayerStats.belongsTo(God);
Entry.hasMany(GodPlayerStats);

module.exports = db;
