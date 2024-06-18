const assert = require('assert');
const sinon = require('sinon');

const command = require('../../../../../../bin/modules/user/repositories/commands/command');
const query = require('../../../../../../bin/modules/user/repositories/queries/query');
const jwtAuth = require('../../../../../../bin/auth/jwt_auth_helper');
const User = require('../../../../../../bin/modules/user/repositories/commands/domain');
const logger = require('../../../../../../bin/helpers/utils/logger');
const common = require('../../../../../../bin/helpers/utils/common');

describe('User-domain', () => {

  const queryResult = {
    err: null,
    data: {
      userId: '32065707-d9df-4f40-98f9-331423827adf',
      algorithm : 'aes-256-ctr',
      secretKey : 'Dom@in2018',
      name: 'Cargo Daya Abadi',
      email: 'dayaabadi@lontar.co',
      password: 'password',
      newPassword: 'newPassword',
      avatar: '',
      userMeta: {
        companyId: 'a65ef2d7-7898-4ce4-86bc-ea297e895087',
        phone: '4370800',
        userId: 'a65ef2d7-7898-4ce4-86bc-ea297e895087',
        deviceId : '1234'
      },
      roles: [
        'cargo-owner'
      ],
      apps: [
        'transport-cargo'
      ],
      isActive: true,
      isDeleted: false,
      createdAt: '2019-12-12T02:22:02.236Z',
      modifiedAt: '',
      data: { newPassword: 'newPassword' }
    },
    'message': 'Your Request Has Been Processed',
    'code': 200
  };

  const payload = {
    userId: '32065707-d9df-4f40-98f9-331423827adf',
    algorithm : 'aes-256-ctr',
    secretKey : 'Dom@in2018',
    name: 'Cargo Daya Abadi',
    email: 'dayaabadi@lontar.co',
    password: 'password',
    newPassword: 'newPassword',
    avatar: '',
    userMeta: {
      companyId: 'a65ef2d7-7898-4ce4-86bc-ea297e895087',
      phone: '4370800',
      userId: 'a65ef2d7-7898-4ce4-86bc-ea297e895087',
      deviceId : '1234'
    },
    roles: [
      'cargo-owner'
    ],
    apps: [
      'transport-cargo'
    ],
    isActive: true,
    isDeleted: false,
    createdAt: '2019-12-12T02:22:02.236Z',
    modifiedAt: '',
    data: { newPassword: 'newPassword' }
  };

  const db = {
    setCollection: sinon.stub()
  };

  const user = new User(db);

  const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9';

  before(() => {
    sinon.stub(logger, 'log');
  });

  after(() => {
    logger.log.restore();
  });

  describe('login', () => {
    it('should generate jwt token', async() => {
      sinon.stub(query.prototype, 'findOneUser').resolves(queryResult);
      sinon.stub(common, 'compareHash').resolves(true);
      sinon.stub(jwtAuth, 'generateToken').resolves(token);
      const res = await user.login(payload);
      assert.equal(res.data, token);
      query.prototype.findOneUser.restore();
      jwtAuth.generateToken.restore();
    });

    it('should return error', async() => {
      sinon.stub(query.prototype, 'findOneUser').resolves({ err: 'err'});
      const res = await user.login(payload);
      assert.notEqual(res.err, null);
      query.prototype.findOneUser.restore();
    });

    it('should return user invalid', async() => {
      const payload = {
        'username': 'username',
        'password': 'password'
      };
      sinon.stub(query.prototype, 'findOneUser').resolves(queryResult);
      const res = await user.login(payload);
      assert.notEqual(res.err, null);
      query.prototype.findOneUser.restore();
    });
  });

  describe('register', () => {
    it('should success register', async() => {
      sinon.stub(query.prototype, 'findOneUser').resolves({ data: null});
      sinon.stub(command.prototype, 'insertOne').resolves(queryResult);
      const res = await user.register(payload);
      assert.equal(res.err, null);
      query.prototype.findOneUser.restore();
      command.prototype.insertOne.restore();
    });

    it('should return error', async() => {
      sinon.stub(query.prototype, 'findOneUser').resolves(queryResult);
      const res = await user.register(payload);
      assert.notEqual(res.err, null);
      query.prototype.findOneUser.restore();
    });
  });

  describe('directAddUser', () => {
    it('should return error exist user', async() => {
      sinon.stub(query.prototype, 'findOneUser').resolves(queryResult);
      await user.directAddUser(payload);
      query.prototype.findOneUser.restore();
    });

    it('should return error insert user', async() => {
      sinon.stub(query.prototype, 'findOneUser').resolves({err : true});
      sinon.stub(command.prototype, 'insertOne').resolves({err : true});
      await user.directAddUser(payload);
      query.prototype.findOneUser.restore();
      command.prototype.insertOne.restore();
    });

    it('should return success', async() => {
      sinon.stub(query.prototype, 'findOneUser').resolves({err : true});
      sinon.stub(command.prototype, 'insertOne').resolves(queryResult);
      const res = await user.directAddUser(payload);
      assert.equal(res.err, null);
      query.prototype.findOneUser.restore();
      command.prototype.insertOne.restore();
    });

  });

  describe('directUpdateUser', () => {
    it('should return error insert user', async() => {
      sinon.stub(command.prototype, 'upsertOne').resolves({err : true});
      await user.directUpdateUser(payload);
      command.prototype.upsertOne.restore();
    });

    it('should return success', async() => {
      sinon.stub(command.prototype, 'upsertOne').resolves(queryResult);
      const res = await user.directUpdateUser(payload);
      assert.equal(res.err, null);
      command.prototype.upsertOne.restore();
    });

  });
});
