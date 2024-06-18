const User = require('../../../../../../bin/modules/user/repositories/queries/domain');
const query = require('../../../../../../bin/modules/user/repositories/queries/query');
const sinon = require('sinon');
const assert = require('assert');


describe('viewUser', () => {

  const db = {
    setCollection: sinon.stub()
  };

  const user = new User(db);

  it('should return user data', async() => {

    let queryResult = {
      'err': null,
      'data': {
        '_id': 'userId',
        'username': 'alifsndev',
        'password': 'password'
      }
    };

    sinon.stub(query.prototype, 'findOneUser').resolves(queryResult);

    const userId = 'userId';
    const result = await user.viewUser(userId);

    query.prototype.findOneUser.restore();
    assert.equal(result.data.username, 'alifsndev');

  });

  it('should return error', async() => {

    let queryResult = {
      'err': true,
      'data': null
    };

    sinon.stub(query.prototype, 'findOneUser').resolves(queryResult);

    const userId = 'userId';
    const result = await user.viewUser(userId);

    query.prototype.findOneUser.restore();
    assert.equal(result.err.message, 'Can not find user');

  });
});
