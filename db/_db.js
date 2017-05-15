var Sequelize = require('sequelize');

var db = new Sequelize('postgres://localhost:5432/smiteVizDev', {
  logging: false
});

module.exports = db;