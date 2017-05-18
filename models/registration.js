'use strict';
module.exports = function(sequelize, DataTypes) {
  var registration = sequelize.define('registration', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return registration;
};