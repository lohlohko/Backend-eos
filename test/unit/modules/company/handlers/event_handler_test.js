const sinon = require('sinon');
const assert = require('assert');
const event = require('../../../../../bin/modules/company/handlers/event_handler');
const commandHandler = require('../../../../../bin/modules/company/repositories/commands/command_handler');

describe('Company Event Handler', () => {
  const resultSuccess = {
    err: null,
    data: {
      companyId: 'a47dd549-6d82-400d-8882-1b2d34b31396'
    }
  };

  const payloadCompany = {
    event: 'confirmed',
    payload: {}
  };

  it('Should be success add company', async () => {
    payloadCompany.payload = {
      company: {},
    };
    sinon.stub(commandHandler, 'createCompany').resolves(resultSuccess);
    const result = await event.createCompany(payloadCompany);
    assert.equal(result.err, null);
    commandHandler.createCompany.restore();
  });

  it('Should be success updateCompany', async () => {
    payloadCompany.payload = {
      company: {},
    };
    sinon.stub(commandHandler, 'updateCompany').resolves(resultSuccess);
    const result = await event.updateCompany(payloadCompany);
    assert.equal(result.err, null);
    commandHandler.updateCompany.restore();
  });
});
