
const assert = require('assert');
const sinon = require('sinon');

const Query = require('../../../../../../bin/modules/user/repositories/queries/query');

describe('findOneUser', () => {

  const db = {
    setCollection: sinon.stub(),
    findOneProject: sinon.stub().resolves({
      'err': null,
      'data': {
        '_id': '5bac53b45ea76b1e9bd58e1c',
        'username': 'username',
        'password': 'password'
      }
    })
  };

  it('should return success', async() => {
    const query = new Query(db);
    const result = await query.findOneUser({}, { _id: 0 });
    assert.notEqual(result.data, null);
    assert.equal(result.data.username, 'username');
  });

});
