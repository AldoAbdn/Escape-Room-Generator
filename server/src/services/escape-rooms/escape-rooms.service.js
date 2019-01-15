// Initializes the `escape-rooms` service on path `/escape-rooms`
const createService = require('feathers-mongodb');
const hooks = require('./escape-rooms.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/escape-rooms', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('escape-rooms');

  mongoClient.then(db => {
    service.Model = db.collection('escape-rooms');
  });

  service.hooks(hooks);
};
