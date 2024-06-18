const sinon = require('sinon');
const assert = require('assert');
const { Pool } = require('pg');
const logger = require('../../../../../bin/helpers/utils/logger');
const { expect } = require('chai');

describe('PostgreSQL Connection', () => {
    let poolStub;
    let poolConnectStub;
    let loggerErrorStub;
  
    beforeEach(() => {
        poolConnectStub = sinon.stub();
        poolStub = sinon.stub(Pool.prototype, 'connect').callsFake(poolConnectStub);
        loggerErrorStub = sinon.stub(logger, 'error');

        // Reinitialize the module here to clear the state
        delete require.cache[require.resolve('../../../../../bin/helpers/databases/postgresql/connection')];
        pgConnection = require('../../../../../bin/helpers/databases/postgresql/connection');
    });
  
    afterEach(() => {
        poolStub.restore();
        loggerErrorStub.restore();
    });
  
    it('should initialize connection pool successfully', async () => {
        const pgConfig = { connectionString: 'postgres://user:password@localhost:5432/mydb' };

        poolConnectStub.resolves();

        const conn = await pgConnection.init(pgConfig);

        expect(conn).not.equal(null);

    });
  
    it('should handle error during connection pool initialization', async () => {
        const pgConfig = { connectionString: '' };

        await pgConnection.init(pgConfig);

        sinon.assert.calledOnce(loggerErrorStub);
      });
  
    it('should get connection from pool', async () => {
  
        await pgConnection.init();

        const result = await pgConnection.getConnection();

        assert.notEqual(result, undefined);
        assert.notEqual(result, null);
    });
  
  
  });