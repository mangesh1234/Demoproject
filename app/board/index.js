'use strict';
const controller = require('./controller');

module.exports = (routes) => {
  routes.get('/app/board', controller.list);
  routes.post('/app/board/save', controller.save);
};