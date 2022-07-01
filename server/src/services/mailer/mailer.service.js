// Initializes the `mailer` service on path `/mailer`
const hooks = require('./mailer.hooks');
const smtpTransport = require('nodemailer-smtp-transport');
const configuration = {
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
};
const Mailer = require('feathers-mailer')(smtpTransport(configuration));

/** 
 * Setups up mailer service for sending emails via SMTP
 */
module.exports = function (app) {
  // Initialize our service 
  app.use('/mailer', Mailer);

  // Get our initialized service so that we can register hooks
  const service = app.service('mailer');

  service.hooks(hooks);
};
