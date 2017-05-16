var Sequelize = require('sequelize');

var db = new Sequelize('postgres://localhost:5432/smiteVizDev', {
  dialect: 'postgres',
  logging: false
});

module.exports = db;