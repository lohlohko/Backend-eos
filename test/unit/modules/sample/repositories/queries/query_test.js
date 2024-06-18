
const assert = require('assert');
const sinon = require('sinon');

const Query = require('../../../../../../bin/modules/sample/repositories/queries/query');

describe('get sample', () => {
  const db = {
    setCollection: sinon.stub(),
    findOne: sinon.stub().resolves({
      err: null,
      data: {
        _id: '5d6f31de4440e00011dacfbc',
        sampleId: 'f362097e-d444-4d70-ba72-cdc941b36c13',
        sampleName: 'sample',
      }
    })
  };

  it('should return success', async() => {
    const query = new Query(db);
    const result = await query.findOne({}, {});
    assert.notEqual(result.data, null);
    assert.equal(result.data.sampleName, 'sample');
  });
});

describe('get list sample', () => {
  const db = {
    setCollection: sinon.stub(),
    findMany: sinon.stub().resolves({
      err: null,
      data: [
        {
          _id: '5d6f31de4440e00011dacfbc',
          sampleId: 'f362097e-d444-4d70-ba72-cdc941b36c13',
          sampleName: 'sample',
        }
      ]
    })
  };

  it('should return success', async() => {
    const query = new Query(db);
    const result = await query.findMany({});
    assert.notEqual(result.data, null);
    assert.equal(result.data[0].sampleName, 'sample');
  });

});

describe('get sample raw query', () => {
  const db = {
    setCollection: sinon.stub(),
    selectRawQuery: sinon.stub().resolves({
      err: null,
      data: {
        _id: '5d6f31de4440e00011dacfbc',
        sampleId: 'f362097e-d444-4d70-ba72-cdc941b36c13',
        sampleName: 'sample',
      }
    })
  };

  it('should return success', async() => {
    const query = new Query(db);
    const result = await query.selectRawQuery('select sampleid, sampleName from sample where sampleid = ?', ["5d6f31de4440e00011dacfbc"]);
    assert.notEqual(result.data, null);
    assert.equal(result.data.sampleName, 'sample');
  });
});