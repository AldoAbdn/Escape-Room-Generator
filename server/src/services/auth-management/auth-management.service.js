// Initializes the `authmanagement` service on path `/authmanagement`
const hooks = require('./auth-management.hooks');
const notifier = require('./notifier');
const authManagement = require('feathers-authentication-management');

/**
 * auth-management service
 * @function
 * @param {Object} app
 */
module.exports = function (app) {
  // Initialize our service 
  app.configure(authManagement({path:"auth-management",notifier:notifier(app)}));

  // Get our initialized service so that we can register hooks
  const service = app.service('auth-management');

  service.hooks(hooks);
};
