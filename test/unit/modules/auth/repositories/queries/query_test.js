
const assert = require('assert');
const sinon = require('sinon');

const Query = require('../../../../../../bin/modules/auth/repositories/queries/query');

describe('findProjection', () => {

  const db = {
    setCollection: sinon.stub(),
    findOneProject: sinon.stub().resolves({
      'err': null,
      'data': {
        '_id': '5bac53b45ea76b1e9bd58e1c',
        'authname': 'authname',
        'password': 'password'
      }
    })
  };

  it('should return success', async() => {
    const query = new Query(db);
    const result = await query.findOneProject({}, {});
    assert.notEqual(result.data, null);
  });

});
