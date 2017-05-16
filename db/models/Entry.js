var Sequelize = require('sequelize');
var db = require('../_db');

var Entry = db.define('Entry', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  numberOfGames: Sequelize.INTEGER,
  matchIds: Sequelize.ARRAY(Sequelize.INTEGER),
  gameWindowOpen: Sequelize.DATE,
  gameWindowClose: Sequelize.DATE

});

module.exports = Entry;


