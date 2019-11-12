const auth = require('@feathersjs/authentication');
const commonHooks = require('feathers-hooks-common');
const isAction = (...args) => hook => args.includes(hook.data.action);

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ 
      commonHooks.iff(isAction('passwordChange', 'identityChange'),
        auth.verifyToken(),
        auth.populateUser(),
        auth.restrictToAuthenticated()
      ),
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
