// Initializes the `authmanagement` service on path `/authmanagement`
const hooks = require('./auth-management.hooks');
const notifier = require('./notifier');
const authManagement = require('feathers-authentication-management');
module.exports = function (app) {
  // Initialize our service 
  app.configure(authManagement(notifier(app)));

  // Get our initialized service so that we can register hooks
  const service = app.service('auth-management');

  service.hooks(hooks);
};
