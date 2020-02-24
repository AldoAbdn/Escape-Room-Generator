const assert = require('assert');
const app = require('../../src/app');

/**
 * Tests for Mailer
 * @function
 */
describe('\'mailer\' service', () => {
  it('registered the service', () => {
    const service = app.service('mailer');

    assert.ok(service, 'Registered the service');
  });
});
