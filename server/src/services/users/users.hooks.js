const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const gravatar = require('../../hooks/gravatar');
const credentialsCheck = require('../../hooks/credentialsCheck');
const passwordCheck = require('../../hooks/passwordCheck');
const convertID = require('../../hooks/convertID');
const commonHooks = require('feathers-hooks-common');
const verifyHooks = require('feathers-authentication-management').hooks;
const notifier = require('../authmanagement/notifier');

module.exports = {
  before: {
    all: [convertID()],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [ hashPassword('password'), verifyHooks.addVerification(), credentialsCheck() , passwordCheck(), gravatar() ],
    update: [ commonHooks.disallow('external')],
    patch: [ hashPassword('password'),authenticate('jwt'), commonHooks.iff(
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
        hashPassword('password'),
        authenticate('jwt')
      ) ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
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
