const commandHandler = require('../../../../../../bin/modules/user/repositories/commands/command_handler');
const User = require('../../../../../../bin/modules/user/repositories/commands/domain');
const sinon = require('sinon');
const assert = require('assert');

describe('User-commandHandler', () => {

  const data = {
    success: true,
    data: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9',
    message: 'Your Request Has Been Processed',
    code: 200
  };

  const payload = {
    'username': 'alifsn',
    'password': 'telkomdev'
  };

  describe('login', () => {
    it('should return access token', async() => {
      sinon.stub(User.prototype, 'login').resolves(data);
      const rs = await commandHandler.login(payload);
      assert.notEqual(rs.data, null);
      assert.equal(rs.code, 200);
      User.prototype.login.restore();
    });
  });

  describe('register', () => {
    it('should info success register', async() => {
      sinon.stub(User.prototype, 'register').resolves(data);
      const rs = await commandHandler.register(payload);
      assert.notEqual(rs.data, null);
      assert.equal(rs.code, 200);
      User.prototype.register.restore();
    });
  });

  describe('directAddUser', () => {
    it('should return access token', async() => {
      sinon.stub(User.prototype, 'directAddUser').resolves(data);
      const rs = await commandHandler.addUser(payload);
      assert.notEqual(rs.data, null);
      assert.equal(rs.code, 200);
      User.prototype.directAddUser.restore();
    });
  });

  describe('directUpdateUser', () => {
    it('should return access token', async() => {
      sinon.stub(User.prototype, 'directUpdateUser').resolves(data);
      const rs = await commandHandler.updateUser(payload);
      assert.notEqual(rs.data, null);
      assert.equal(rs.code, 200);
      User.prototype.directUpdateUser.restore();
    });
  });
});
