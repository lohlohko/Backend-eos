const sinon = require('sinon');
const { expect } = require('chai');

const command = require('../../../../../../bin/modules/company/repositories/commands/command_handler');
const Domain = require('../../../../../../bin/modules/company/repositories/commands/domain');

describe('Company Command Handler', () => {
  let payload, okResponse;
  beforeEach(() => {
    payload = {};
    okResponse = {
      data: [],
      err: null
    };
  });
  describe('Add Company', () => {
    it('Should be a function', () => {
      expect(command.createCompany).to.be.a('function');
    });
    it('Should success add company', async () => {
      sinon.stub(Domain.prototype, 'createCompany').resolves(okResponse);
      const result = await command.createCompany(payload);
      expect(result, okResponse);
      Domain.prototype.createCompany.restore();
    });
  });

  describe('updateCompany', () => {
    it('Should be a function', () => {
      expect(command.updateCompany).to.be.a('function');
    });
    it('Should success add company', async () => {
      sinon.stub(Domain.prototype, 'updateCompany').resolves(okResponse);
      const result = await command.updateCompany(payload);
      expect(result, okResponse);
      Domain.prototype.updateCompany.restore();
    });
  });

});
