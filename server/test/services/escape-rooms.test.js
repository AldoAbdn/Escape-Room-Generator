const assert = require('assert');
const app = require('../../src/app');

/**
 * Test for Escape Rooms
 * @function
 */
describe('\'escape rooms\' service', () => {
  it('registered the service', () => {
    const service = app.service('escaperooms');

    assert.ok(service, 'Registered the service');
  });
});
