const Auth = require('../../../../../../bin/modules/auth/repositories/queries/domain');
const query = require('../../../../../../bin/modules/auth/repositories/queries/query');
const sinon = require('sinon');
const assert = require('assert');


describe('viewAuth', () => {

  const db = {
    setCollection: sinon.stub()
  };

  const auth = new Auth(db);

  it('should return auth data', async() => {

    let queryResult = {
      'err': null,
      'data': {
        '_id': 'id',
        'authname': 'authname',
        'password': 'password'
      }
    };

    sinon.stub(query.prototype, 'findOneProject').resolves(queryResult);

    const authId = 'id';
    const result = await auth.viewAuth(authId);

    query.prototype.findOneProject.restore();
    assert.equal(result.err, null);

  });
});
