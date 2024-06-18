
const assert = require('assert');
const sinon = require('sinon');
const logger = require('../../../../../../bin/helpers/utils/logger');

const Sample = require('../../../../../../bin/modules/sample/repositories/commands/domain');
const command = require('../../../../../../bin/modules/sample/repositories/commands/command');

describe('sample command domain', () => {
  before(() => {
    sinon.stub(logger, 'log');
  });

  after(() => {
    logger.log.restore();
  });

  const resultOne = {
    err: null,
    message: '',
    data: {
      _id: '5d6f31de4440e00011dacfbc',
      sampleId: 'f362097e-d444-4d70-ba72-cdc941b36c13',
      sampleName: 'sample',
      isDeleted : false
    },
    code: 200
  };

  const db = {
    setCollection: sinon.stub()
  };

  const sample = new Sample(db);

  describe('postSample', () => {
    it('Should success postSample', async () => {
      const req = {
        sampleName: 'sample',
        isDeleted : false,
        userMeta : {}
      };
      sinon.stub(command.prototype, 'insertOne').resolves(resultOne);


      const result = await sample.postSample(req);
      assert.equal(result.data.sampleName, 'sample');

      command.prototype.insertOne.restore();
    });
    it('Should fail insert sample no image', async () => {
      const req = {
        sampleName: 'sample',
        isDeleted : false,
        userMeta : {}
      };

      sinon.stub(command.prototype, 'insertOne').resolves({err : true});

      const result = await sample.postSample(req);
      assert.notEqual(result.err, null);

      command.prototype.insertOne.restore();
    });
  });

  describe('update sample', () => {
    it('Should success update sample', async () => {
      const req = {
        sampleId: 'f362097e-d444-4d70-ba72-cdc941b36c13',
        sampleName: 'sample',
        userMeta : {}
      };

      sinon.stub(command.prototype, 'updateOne').resolves(resultOne);


      const result = await sample.updateSample(req);
      assert.equal(result.data.sampleName, 'sample');

      command.prototype.updateOne.restore();
    });

    it('Should fail upsert sample with image', async () => {
      const req = {
        sampleId: 'f362097e-d444-4d70-ba72-cdc941b36c13',
        sampleName: 'sample',
        userMeta : {}
      };

      sinon.stub(command.prototype, 'updateOne').resolves({err : true});

      const result = await sample.updateSample(req);
      assert.notEqual(result.err, null);

      command.prototype.updateOne.restore();
    });
  });


});
