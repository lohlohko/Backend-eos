const sinon = require('sinon');
const assert = require('assert');
const event = require('../../../../../bin/modules/user/handlers/event_handler');
const commandHandler = require('../../../../../bin/modules/user/repositories/commands/command_handler');

describe('User Event Handler', () => {
  const resultSuccess = {
    err: null,
    data: {
      deliveryDetailId: 'a47dd549-6d82-400d-8882-1b2d34b31396'
    }
  };

  const payloadUser = {
    event: 'confirmed',
    payload: {}
  };

  describe('addUser', async () => {
    it('Should be success returning response', async () => {
      payloadUser.payload = {
        capacity: {},
        updateQuery: {}
      };
      sinon.stub(commandHandler, 'addUser').resolves(resultSuccess);
      const result = await event.addUser(payloadUser);
      assert.equal(result.err, null);
      commandHandler.addUser.restore();
    });
  });

  describe('updateUser', async () => {
    it('Should be success returning response', async () => {
      sinon.stub(commandHandler, 'updateUser').resolves(resultSuccess);
      const result = await event.updateUser(payloadUser);
      assert.equal(result.err, null);
      commandHandler.updateUser.restore();
    });
  });

});
