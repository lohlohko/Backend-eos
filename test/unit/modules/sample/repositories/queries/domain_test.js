
const assert = require('assert');
const sinon = require('sinon');
const logger = require('../../../../../../bin/helpers/utils/logger');

const Sample = require('../../../../../../bin/modules/sample/repositories/queries/domain');
const query = require('../../../../../../bin/modules/sample/repositories/queries/query');

describe('sample query domain', () => {
  before(() => {
    sinon.stub(logger, 'log');
  });

  after(() => {
    logger.log.restore();
  });
  const resultMany = {
    err: null,
    message: '',
    data: [
      {
        _id: '5d6f31de4440e00011dacfbc',
        sampleId: 'f362097e-d444-4d70-ba72-cdc941b36c13',
        sampleName: 'sample',
      }
    ],
    code: 200
  };

  const resultOne = {
    err: null,
    message: '',
    data: {
      _id: '5d6f31de4440e00011dacfbc',
      sampleId: 'f362097e-d444-4d70-ba72-cdc941b36c13',
      sampleName: 'sample',
    },
    code: 200
  };

  const db = {
    setCollection: sinon.stub()
  };

  const sample = new Sample(db);

  describe('get sample', () => {
    it('Should success get sample', async () => {
      const req = {
        sampleId: 'f362097e-d444-4d70-ba72-cdc941b36c13'
      };

      sinon.stub(query.prototype, 'findOne').resolves(resultOne);

      const result = await sample.getSample(req);
      assert.equal(result.data.sampleName, 'sample');

      query.prototype.findOne.restore();
    });
    it('Should fail find sample', async () => {
      const req = {
        sampleId: 'f362097e-d444-4d70-ba72-cdc941b36c13'
      };

      sinon.stub(query.prototype, 'findOne').resolves({ err: true });

      const result = await sample.getSample(req);
      assert.equal(result.err.message, 'can not find sample');

      query.prototype.findOne.restore();
    });
  });

  describe('listSample', () => {
    it('Should success get filtered list sample', async () => {
      const req = {
        query : {},
        sort : {},
        projection : {
          _id : 0,
          sampleId : 1,
          sampleName : 1
        },
        page : 0,
        size : 0
      };

      sinon.stub(query.prototype, 'findMany').resolves(resultMany);

      const result = await sample.listSample(req);
      assert.equal(result.data[0].sampleName, 'sample');

      query.prototype.findMany.restore();
    });
    it('Should fail get filtered list sample', async () => {
      const req = {};

      sinon.stub(query.prototype, 'findMany').resolves({ err: true });

      const result = await sample.listSample(req);
      assert.deepEqual(result.data[0], null);

      query.prototype.findMany.restore();
    });
  });


});
