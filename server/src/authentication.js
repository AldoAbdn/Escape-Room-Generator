const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth } = require('@feathersjs/authentication-oauth');
const verifyHooks = require('feathers-authentication-management').hooks;
const auth = require('@feathersjs/authentication').hooks;

module.exports = app => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());

  app.service("authentication").hooks({
    before: {
      create: [
        auth.authenticate(authentication.strategies),
        verifyHooks.isVerified() // !!! Add the isVerified hook before authentication
      ],
      remove: [
        auth.authenticate('jwt')
      ]
    },
    after: {
      create: [
        context => {
          // Add the user to the result response
          context.result.user = context.params.user;
          // Don't expose sensitive information.
          delete context.result.user.password;
        }
      ]
    }
  })
};
