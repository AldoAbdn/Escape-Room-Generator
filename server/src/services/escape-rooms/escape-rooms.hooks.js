// Feathers hooks
const auth = require('@feathersjs/authentication').hooks;
const verifyHooks = require('feathers-authentication-management').hooks;
// Custom hooks
const convertID = require('../../hooks/convertID');

module.exports = {
  before: {
    all: [ convertID(), auth.authenticate('jwt'), verifyHooks.isVerified() ],
    find: [],
    get: [],
    create: [],
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
