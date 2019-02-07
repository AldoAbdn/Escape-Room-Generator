const assert = require('assert');
const app = require('../../src/app');

describe('\'escape-rooms\' service', () => {
  it('registered the service', () => {
    const service = app.service('escape-rooms');

    assert.ok(service, 'Registered the service');
  });
});
