'use strict';
const controller = require('./controller');

module.exports = (routes) => {
  routes.post('/api/register', controller.save);
  routes.get('/api/getList', controller.list);
  routes.get('/api/getbyId/:id', controller.getById);
  routes.put('/api/update/:id', controller.update);
};
