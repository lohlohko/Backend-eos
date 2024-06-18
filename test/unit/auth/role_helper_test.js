const sinon = require('sinon');
const { expect } = require('chai');

const helper = require('../../../bin/auth/role_helper');

describe('User Role Check', () => {
  let req, res, next, serviceName;
  beforeEach(() => {
    req = {
      userMeta: {
        roles: ['cargo-owner']
      }
    };
    res = {
      send: sinon.stub()
    };
    serviceName = 'cargo-owner-profile';
    next = sinon.stub();
  });

  it('Should error if roles name not found', () => {
    req.userMeta.roles = ['admin'];
    expect(helper.checkRole(serviceName)).to.throw();
  });

  it('Should error if service name not found', () => {
    serviceName = 'delete-user';
    const result = helper.checkRole(serviceName);
    expect(result(req, res, next));
  });

  it('Should pass role checking', () => {
    const result = helper.checkRole(serviceName);
    expect(result(req, res, next));
  });

});
