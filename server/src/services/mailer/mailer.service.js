// Initializes the `mailer` service on path `/mailer`
const hooks = require('./mailer.hooks');
const Mailer = require('feathers-mailer')
const configuration = {
  host: process.env.SMTP_HOST,
  auth: {
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASS
  }
};

module.exports = function (app) {
  // Initialize our service 
  app.use('/mailer', Mailer(configuration));

  // Get our initialized service so that we can register hooks
  const service = app.service('mailer');

  service.hooks(hooks);
};
