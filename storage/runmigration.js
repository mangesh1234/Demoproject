'use strict';

const Umzug = require('umzug');
const maindb = require('../models');
const migratemaindb = new Umzug({
  storage: 'sequelize',
  storageOptions: {
    sequelize: maindb.sequelize,
    // The name of table to create if `model` option is not supplied
    // Defaults to `modelName`
    modelName: 'migrations',

    // The name of table column holding migration name.
    // Defaults to 'name'.
    columnName: 'name'
  },
  migrations: {
    path: './migrations'
  }
});

module.exports = () => {
  return migratemaindb.up();
};
