const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const jwtHelper = require('../../../bin/auth/jwt_auth_helper');

describe('Json Web Token', () => {
  let decodedToken = {
    'username': 'alifsn',
    'sub': '5bac53b45ea76b1e9bd58e1c',
    'iat': 1540469257,
    'exp': 1540475257,
    'aud': '97b33193-43ff-4e58-9124-b3a9b9f72c34',
    'iss': 'telkomdev'
  };

  describe('generateToken', () => {
    it('should success generate token', async() => {
      sinon.stub(jwt, 'sign');
      await jwtHelper.generateToken({});
      jwt.sign.restore();
    });
  });

  describe('verifyToken', () => {
    it('should return error invalid token case 1', async() => {
      const req = {
        headers: { authorization: 'Bearer 12345' }
      };
      const res = {
        send: sinon.stub()
      };
      const next = sinon.stub();
      await jwtHelper.verifyToken(req, res, next);
    });
    it('should return error invalid token case 2', async() => {
      const req = {
        headers: {  authorization: `Bearer 12345 test test` }
      };
      const res = {
        send: sinon.stub()
      };
      const next = sinon.stub();
      await jwtHelper.verifyToken(req, res, next);
    });
    it('should return error invalid token case 3', async() => {
      const req = {
        headers: {}
      };
      const res = {
        send: sinon.stub()
      };
      const next = sinon.stub();
      await jwtHelper.verifyToken(req, res, next);
    });
    it('should return error expired token', async() => {
      const req = {
        headers: {
          authorization: 'Bearer 12345'
        }
      };
      const res = {
        send: sinon.stub()
      };
      const next = sinon.stub();
      sinon.stub(jwt, 'verify').throws(new jwt.TokenExpiredError('error', new Date()));
      await jwtHelper.verifyToken(req, res, next);
      jwt.verify.restore();
    });
  });
});