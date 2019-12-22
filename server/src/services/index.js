const users = require('./users/users.service.js');
const escapeRooms = require('./escape-rooms/escape-rooms.service.js');
const mailer = require('./mailer/mailer.service.js');
const authmanagement = require('./authmanagement/auth-management.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(escapeRooms);
  app.configure(mailer);
  app.configure(authmanagement);
};
