// Initializes the `mailer` service on path `/mailer`
const hooks = require('./mailer.hooks');
const smtpTransport = require('nodemailer-smtp-transport');
const configuration = {
  host: process.env.SMTP_HOST,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
};
const Mailer = require('feathers-mailer')(smtpTransport(configuration));

module.exports = function (app) {
  // Initialize our service 
  app.use('/mailer', Mailer);

  // Get our initialized service so that we can register hooks
  const service = app.service('mailer');

  service.hooks(hooks);
};
