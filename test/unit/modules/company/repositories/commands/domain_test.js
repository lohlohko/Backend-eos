const sinon = require('sinon');
const assert = require('assert');

const logger = require('../../../../../../bin/helpers/utils/logger');
const command = require('../../../../../../bin/modules/company/repositories/commands/command');
const Domain = require('../../../../../../bin/modules/company/repositories/commands/domain');

describe('Company Domain', () => {
  let payload, okResponse;
  beforeEach(() => {
    payload = {
      name:'PT Bosnet Distribution Indonesia',
      type:'PT',
      address:'Jl. Tebet Barat Dalam Raya No.82, RT.17/RW.6',
      cityId:200,
      cityName:'Jakarta',
      truckCompanyId: 'da30eafe-282c-494e-b06b-f9e0973cd75c',
      cargoCompanyId: 'b38c74de-7c62-411e-9009-18fd2962f75d',
      modifiedBy: 'fe061327-e875-473f-b881-4a76ce1f5d90'
    };
    okResponse = {
      data: {
        companyId: 'da30eafe-282c-494e-b06b-f9e0973cd75c'
      },
      err: null
    };
  });

  let db = {
    setCollection: sinon.stub()
  };

  let company = new Domain(db);

  before(() => {
    sinon.stub(logger, 'log');
    sinon.stub(logger, 'error');
  });

  after(() => {
    logger.log.restore();
    logger.error.restore();
  });

  describe('Add Company', () => {
    it('Should error add company', async () => {
      sinon.stub(command.prototype, 'insertOne').resolves({ err: true });
      const result = await company.createCompany(payload);
      assert.equal(result.err.message, 'Tidak dapat menambah perusahaan baru');
      command.prototype.insertOne.restore();
    });
    it('Should success add company', async () => {
      sinon.stub(command.prototype, 'insertOne').resolves(okResponse);
      const result = await company.createCompany(payload);
      assert.equal(result.err, null);
      command.prototype.insertOne.restore();
    });
  });

  describe('updateCompany', () => {
    it('Should error update company info', async () => {
      sinon.stub(command.prototype, 'upsertOne').resolves({ err: true });
      const result = await company.updateCompany(payload);
      assert.equal(result.err.message, 'Tidak dapat mengubah data perusahaan');
      command.prototype.upsertOne.restore();
    });
    it('Should success assign company', async () => {
      sinon.stub(command.prototype, 'upsertOne').resolves(okResponse);
      const result = await company.updateCompany(payload);
      assert.equal(result.err, null);
      command.prototype.upsertOne.restore();
    });
  });
});
