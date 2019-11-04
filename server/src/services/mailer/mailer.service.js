// Initializes the `mailer` service on path `/mailer`
const hooks = require('./mailer.hooks');
const smtpTransport = require('nodemailer-smtp-transport');
const configuration = {
  host: process.env.SMTP_HOST,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASS
  }
};
const Mailer = require('feathers-mailer')(smtpTransport(configuration));

module.exports = function (app) {
  // Initialize our service 
  app.use('/mailer', );

  // Get our initialized service so that we can register hooks
  const service = app.service('mailer',Mailer);

  service.hooks(hooks);
};
