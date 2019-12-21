// Feathers hooks
const auth = require('@feathersjs/authentication').hooks;
const authlocal = require('@feathersjs/authentication-local').hooks;
const verifyHooks = require('feathers-authentication-management').hooks;
const commonHooks = require('feathers-hooks-common');
// Custom hooks
const gravatar = require('../../hooks/gravatar');
const credentialsCheck = require('../../hooks/credentialsCheck');
const passwordCheck = require('../../hooks/passwordCheck');
const convertID = require('../../hooks/convertID');
const notifier = require('../auth-management/notifier');

module.exports = {
  before: {
    all: [convertID()],
    find: [ auth.authenticate('jwt'), verifyHooks.isVerified() ],
    get: [ auth.authenticate('jwt'), verifyHooks.isVerified() ],
    create: [ authlocal.hashPassword('password'), verifyHooks.addVerification(), credentialsCheck(), passwordCheck(), gravatar() ],
    update: [ commonHooks.disallow('external')],
    patch: [ authlocal.hashPassword('password'), auth.authenticate('jwt'), commonHooks.iff(
      commonHooks.isProvider('external'),
        commonHooks.preventChanges(true,
          'isVerified',
          'verifyToken',
          'verifyShortToken',
          'verifyExpires',
          'verifyChanges',
          'resetToken',
          'resetShortToken',
          'resetExpires'
        ),
        authlocal.hashPassword('password'),
        auth.authenticate('jwt')
      ) ],
    remove: [ auth.authenticate('jwt'), verifyHooks.isVerified() ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      authlocal.protect('password')
    ],
    find: [],
    get: [],
    create: [ context => {notifier(context.app).notifier('resendVerifySignup', context.result)}, verifyHooks.removeVerification() ],
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
