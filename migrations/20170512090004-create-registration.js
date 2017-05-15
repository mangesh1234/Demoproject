'use strict';
const maindb = require('../models');
// console.log(maindb.Sequelize.getQueryInterface());
const queryInterface = maindb.sequelize.getQueryInterface();
const Sequelize = maindb.Sequelize;
module.exports = {
  up: function() {
    return queryInterface.createTable('registrations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function() {
    return queryInterface.dropTable('registrations');
  }
};