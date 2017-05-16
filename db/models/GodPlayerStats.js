var Sequelize = require('sequelize');
var db = require('../_db');

var GodPlayerStats = db.define('GodPlayerStats', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  timesBanned: Sequelize.INTEGER,
  wins: Sequelize.INTEGER,
  losses: Sequelize.INTEGER,
  damageStats: Sequelize.JSONB,
  kills: Sequelize.INTEGER,
  deaths: Sequelize.INTEGER,
  assists: Sequelize.INTEGER,
  goldEarned: Sequelize.INTEGER,
  goldEarnedPerMin: Sequelize.INTEGER,
  finalLevel: Sequelize.INTEGER
});

module.exports = GodPlayerStats;
