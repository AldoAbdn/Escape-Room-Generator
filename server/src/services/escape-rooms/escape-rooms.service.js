// Initializes the `escape rooms` service on path `/escaperooms`
const { EscapeRooms } = require('./escape-rooms.class');
const hooks = require('./escape-rooms.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/escape-rooms', new EscapeRooms(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('escape-rooms');

  service.hooks(hooks);
};
