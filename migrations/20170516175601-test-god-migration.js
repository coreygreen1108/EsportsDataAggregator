'use strict';

let co = require('co');
let db = require('../db');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return co(function *() {
      var god = yield db.model('God').create({
        name: 'Terra'
      })
      return 'hi';
    })
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
