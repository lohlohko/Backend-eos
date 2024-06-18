const sinon = require('sinon');
const basicAuthHelper = require('../../../bin/auth/basic_auth_helper');
const queryAuth = require('../../../bin/modules/auth/repositories/queries/query_handler');

describe('isAuthenticated', () => {
  it('should return error isAuthenticated case 1', async() => {
    const req = {
      authorization: { basic : {}}
    };
    const res = {
      send: sinon.stub()
    };
    const cb = sinon.stub();
    basicAuthHelper.isAuthenticated(req, res, cb);
  });
  it('should return error isAuthenticated case 2', async() => {
    const req = {
      authorization: {
        basic : {
          username: 'username',
          password: 'password'
        }
      }
    };
    const res = {
      send: sinon.stub()
    };
    const cb = sinon.stub();
    await basicAuthHelper.isAuthenticated(req, res, cb);
  });
  it('should return error isAuthenticated case 3', async() => {
    const req = {
      authorization: {
        basic : {
          username: '',
          password: ''
        }
      }
    };
    const res = {
      send: sinon.stub()
    };
    const cb = sinon.stub();
    await basicAuthHelper.isAuthenticated(req, res, cb);
  });
});
describe('isExtAuthenticated', () => {
  it('should return error isExtAuthenticated case 1', async() => {
    const req = {
      authorization: { basic : {}}
    };
    const res = {
      send: sinon.stub()
    };
    const cb = sinon.stub();
    await basicAuthHelper.isExtAuthenticated(req, res, cb);
  });
  it('should return error isExtAuthenticated case 2', async() => {
    const req = {
      authorization: {
        basic : {
          username: 'username',
          password: 'password'
        }
      }
    };
    const res = {
      send: sinon.stub()
    };
    const cb = sinon.stub();

    sinon.stub(queryAuth, 'getAuth').resolves({ data : { username : 'username', password : 'password'}});
    await basicAuthHelper.isExtAuthenticated(req, res, cb);
    queryAuth.getAuth.restore();
  });
  it('should return error isExtAuthenticated case 3', async() => {
    const req = {
      authorization: {
        basic : {
          username: '',
          password: ''
        }
      }
    };
    const res = {
      send: sinon.stub()
    };
    sinon.stub(queryAuth, 'getAuth').resolves({ err : true});
    await basicAuthHelper.isExtAuthenticated(req, res);
    queryAuth.getAuth.restore();
  });
});
