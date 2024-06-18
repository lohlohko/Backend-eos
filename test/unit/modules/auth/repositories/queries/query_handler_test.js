const queryHandler = require('../../../../../../bin/modules/auth/repositories/queries/query_handler');
const Auth = require('../../../../../../bin/modules/auth/repositories/queries/domain');
const sinon = require('sinon');
const assert = require('assert');

describe('Auth-queryHandler', () => {

  const resultOne = {
    err: null,
    message: '',
    data: {
      authId: '0e4e2d82-199f-49a7-9fae-33ef138d4726',
      isDeleted: false,
    },
    code: 200
  };

  describe('getAuth', () => {

    it('should return success get Auth', async () => {
      sinon.stub(Auth.prototype, 'viewAuth').resolves(resultOne);

      const rs = await queryHandler.getAuth();

      assert.notEqual(rs.data, null);
      assert.equal(rs.code, 200);

      Auth.prototype.viewAuth.restore();
    });
  });


});
