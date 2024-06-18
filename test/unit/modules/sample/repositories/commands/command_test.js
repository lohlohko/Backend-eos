
const assert = require('assert');
const sinon = require('sinon');

const Command = require('../../../../../../bin/modules/sample/repositories/commands/command');

describe('post sample', () => {
  const db = {
    setCollection: sinon.stub(),
    insertOne: sinon.stub().resolves({
      err: null,
      data: {
        _id: '5d6f31de4440e00011dacfbc',
        sampleId: 'f362097e-d444-4d70-ba72-cdc941b36c13',
        sampleName: 'sample',
      }
    })
  };

  it('should return success', async() => {
    const command = new Command(db);
    const result = await command.insertOne({
      sampleId: 'f362097e-d444-4d70-ba72-cdc941b36c13',
      sampleName: 'sample',
    });
    assert.notEqual(result.data, null);
    assert.equal(result.data.sampleName, 'sample');
  });
});

describe('upsert sample', () => {
  const db = {
    setCollection: sinon.stub(),
    updateOne: sinon.stub().resolves({
      err: null,
      data:
        {
          _id: '5d6f31de4440e00011dacfbc',
          sampleId: 'f362097e-d444-4d70-ba72-cdc941b36c13',
          sampleName: 'sample',
        }

    })
  };

  it('should return success', async() => {
    const command = new Command(db);
    const result = await command.updateOne({sampleName: 'sample'});
    assert.notEqual(result.data, null);
    assert.equal(result.data.sampleName, 'sample');
  });
});

describe('insert raw query sample', () => {
  const db = {
    setCollection: sinon.stub(),
    insertRawQuery: sinon.stub().resolves({
      err: null,
      data: {
        _id: '5d6f31de4440e00011dacfbc',
        sampleId: 'f362097e-d444-4d70-ba72-cdc941b36c13',
        sampleName: 'sample',
      }
    })
  };

  it('should return success', async() => {
    const command = new Command(db);
    const result = await command.insertRawQuery(
      'INSERT INTO SAMPLE SET ?', [{
        sampleId: 'f362097e-d444-4d70-ba72-cdc941b36c13',
        sampleName: 'sample',
      }]
    );
    assert.notEqual(result.data, null);
    assert.equal(result.data.sampleName, 'sample');
  });
});

describe('update raw query sample', () => {
  const db = {
    setCollection: sinon.stub(),
    updateRawQuery: sinon.stub().resolves({
      err: null,
      data: {
        _id: '5d6f31de4440e00011dacfbc',
        sampleId: 'f362097e-d444-4d70-ba72-cdc941b36c13',
        sampleName: 'sample',
      }
    })
  };

  it('should return success', async() => {
    const command = new Command(db);
    const result = await command.updateRawQuery(
      'UPDATE SAMPLE SET samplename = ? WHERE sampleid = ?', ['sample', 'f362097e-d444-4d70-ba72-cdc941b36c13']
    );
    assert.notEqual(result.data, null);
    assert.equal(result.data.sampleName, 'sample');
  });
});