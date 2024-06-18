
const assert = require('assert');
const sinon = require('sinon');

const sample = require('../../../../../../bin/modules/sample/repositories/queries/domain');
const query_handler = require('../../../../../../bin/modules/sample/repositories/queries/query_handler');

describe('#sample-queryhandler', async () => {
  const result = {
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

  it('Should success get sample', async () => {
    sinon.stub(sample.prototype, 'getSample').resolves(resultOne);
    const rs = await query_handler.getSample();
    assert.notEqual(rs.data, null);
    assert.equal(rs.code, 200);
    sample.prototype.getSample.restore();
  });

  it('Should success get list sample', async () => {
    sinon.stub(sample.prototype, 'listSample').resolves(result);
    const rs = await query_handler.listSample();
    assert.notEqual(rs.data, null);
    assert.equal(rs.code, 200);
    sample.prototype.listSample.restore();
  });

});
