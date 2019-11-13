const auth = require('@feathersjs/authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const convertID = require('../../hooks/convertID');
const isAction = (...args) => hook => args.includes(hook.data.action);

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ 
      commonHooks.iff(isAction('passwordChange', 'identityChange'),
        convertID(),auth.authenticate('jwt')
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
