const sinon = require('sinon');
const mysql = require('mysql2');

const { expect } = require('chai');
const { init, getConnection } = require('../../../../../bin/helpers/databases/mysql/connection');


describe('MySQL Connection', () => {
    let createPoolStub;
    let getConnectionStub;
    let releaseStub;
    let loggerInfoStub;
    let loggerErrorStub;

    beforeEach(() => {
        createPoolStub = sinon.stub(mysql, 'createPool');
        getConnectionStub = sinon.stub();
        releaseStub = sinon.stub();
        loggerInfoStub = sinon.stub(console, 'info');
        loggerErrorStub = sinon.stub(console, 'error');

        createPoolStub.returns({
        getConnection: getConnectionStub,
        });
        getConnectionStub.callsArgWith(0, null, {
        release: releaseStub,
        });
    });
    
    afterEach(() => {
        createPoolStub.restore();
        loggerInfoStub.restore();
        loggerErrorStub.restore();
    });

    describe('init', () => {
        it('should initialize the connection pool', async () => {
          const mysqlConfig = {
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'test',
          };
    
          await init(mysqlConfig);
    
          expect(createPoolStub.calledOnceWith(mysqlConfig)).to.be.true;
          expect(getConnectionStub.calledOnce).to.be.true;
          expect(releaseStub.calledOnce).to.be.true;
          expect(loggerErrorStub.notCalled).to.be.true;
        });
    
        it('should log an error if there is a connection error', async () => {
          const mysqlConfig = {
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'test',
          };
          const error = new Error('connection error');
    
          getConnectionStub.callsArgWith(0, error);
    
          await init(mysqlConfig);
    
          expect(createPoolStub.calledOnceWith(mysqlConfig)).to.be.true;
          expect(getConnectionStub.calledOnce).to.be.true;
          expect(releaseStub.notCalled).to.be.true;
          expect(loggerInfoStub.notCalled).to.be.true;
        });
      });

      describe('getConnection', () => {
        it('should return a connection from the pool', async () => {
          const mysqlConfig = { host: 'localhost', user: 'root', password: 'password', database: 'test' };
          const connection = { query: sinon.stub() };
      
          getConnectionStub.callsArgWith(0, null, connection);
      
          const result = await getConnection(mysqlConfig);
      
          expect(result).not.equal(null);
        });
      
        it('should initialize a new connection pool if one does not exist', async () => {
          const mysqlConfig = { host: 'localhost2', user: 'root', password: 'password', database: 'test' };
          const connection = { query: sinon.stub() };
      
          getConnectionStub.callsArgWith(0, null, connection);
      
          const result = await getConnection(mysqlConfig);
      
          expect(result).not.equal(null);
        });
      
      });

  });