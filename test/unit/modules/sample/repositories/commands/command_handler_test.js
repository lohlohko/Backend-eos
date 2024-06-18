
const assert = require('assert');
const sinon = require('sinon');

const sample = require('../../../../../../bin/modules/sample/repositories/commands/domain');
const command_handler = require('../../../../../../bin/modules/sample/repositories/commands/command_handler');

describe('#sample-queryhandler', async () => {
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

  it('Should success post sample', async () => {
    sinon.stub(sample.prototype, 'postSample').resolves(resultOne);
    const rs = await command_handler.postSample();
    assert.notEqual(rs.data, null);
    assert.equal(rs.code, 200);
    sample.prototype.postSample.restore();
  });

  it('Should success update sample', async () => {
    sinon.stub(sample.prototype, 'updateSample').resolves(resultOne);
    const rs = await command_handler.updateSample();
    assert.notEqual(rs.data, null);
    assert.equal(rs.code, 200);
    sample.prototype.updateSample.restore();
  });

});
