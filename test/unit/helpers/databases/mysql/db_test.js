const sinon = require('sinon');
const assert = require('assert');

const db = require('../../../../../bin/helpers/databases/mysql/db');

describe('MYSQL', () => {
    let stubExecuteQuery;

    beforeEach(async () => {
        stubExecuteQuery = sinon.stub(db.prototype, 'executeQuery');
    });

    afterEach(() => {
        stubExecuteQuery.restore();
    });

    describe('findOne', () => {
        it('should return wrapper error when db function is error', async () => {
            stubExecuteQuery.rejects(new Error('Error Db function'));
            const res = await db.prototype.findOne({}, {}, 'test');
            assert.notEqual(res.err, null);
            stubExecuteQuery.restore();
        });
        it('should return wrapper data when findOne not success', async () => {
            stubExecuteQuery.returns({
                findOne: sinon.stub().callsFake(() => {
                    return Promise.resolve({});
                })
            });
            const res = await db.prototype.findOne({}, {}, 'test');
            assert.notEqual(res.err, true);
            stubExecuteQuery.restore();
        });
        it('should return wrapper data when findOne success', async () => {
            stubExecuteQuery.returns([{ok: true}]);
            const res = await db.prototype.findOne({}, {}, 'test');
            assert.equal(res.data.ok, true);
            stubExecuteQuery.restore();
        });
    });

    describe('insertOne', () => {
        it('should return wrapper error when db function is error', async () => {
            stubExecuteQuery.rejects(new Error('Error Db function'));
            const res = await db.prototype.insertOne({});
            assert.notEqual(res.err, null);
            stubExecuteQuery.restore();
        });
        it('should return wrapper data when insertOne success', async () => {
            stubExecuteQuery.returns({});
            const res = await db.prototype.insertOne({});
            assert.notEqual(res.data, null);
            stubExecuteQuery.restore();
        });
    });

    describe('updateOne', () => {
        it('should return wrapper error when db function is error', async () => {
            stubExecuteQuery.rejects(new Error('Error Db function'));
            const res = await db.prototype.updateOne({});
            assert.notEqual(res.err, null);
            stubExecuteQuery.restore();
        });
        it('should return wrapper data when updateOne success', async () => {
            stubExecuteQuery.returns({});
            const res = await db.prototype.updateOne({});
            assert.notEqual(res.data, null);
            stubExecuteQuery.restore();
        });
    });

    describe('countData', () => {
        it('should return wrapper error when db function is error', async () => {
            stubExecuteQuery.rejects(new Error('Error Db function'));
            const res = await db.prototype.countData({});
            assert.notEqual(res.err, null);
            stubExecuteQuery.restore();
        });
        it('should return wrapper data when countData success', async () => {
            stubExecuteQuery.returns([{data: "data"}]);
            const res = await db.prototype.countData({});
            assert.equal(res.data.data, 'data');
            stubExecuteQuery.restore();
        });
    });

    describe('findMany', () => {
        it('should return wrapper error when db function is error', async () => {
            stubExecuteQuery.rejects(new Error('Error Db function'));
            const res = await db.prototype.findMany({});
            assert.notEqual(res.err, null);
            stubExecuteQuery.restore();
        });
        it('should return wrapper data when findMany success', async () => {
            stubExecuteQuery.returns([{ 'ok': true }, { 'ok': false }]);
            const res = await db.prototype.findMany({}, {}, "ASC", 1, 10, "");
            assert.equal(res.data[0].ok, true);
            stubExecuteQuery.restore();
        });
    });

    describe('selectRawQuery', () => {
        it('should return wrapper error when db function is error', async () => {
            stubExecuteQuery.rejects(new Error('Error Db function'));
            const res = await db.prototype.selectRawQuery('', []);
            assert.notEqual(res.err, null);
            stubExecuteQuery.restore();
        });
        it('should return wrapper data when selectRawQuery not success', async () => {
            stubExecuteQuery.returns({
                selectRawQuery: sinon.stub().callsFake(() => {
                    return Promise.resolve({});
                })
            });
            const res = await db.prototype.selectRawQuery('', []);
            assert.notEqual(res.err, true);
            stubExecuteQuery.restore();
        });
        it('should return wrapper data when selectRawQuery success', async () => {
            stubExecuteQuery.returns([{ok: true}]);
            const res = await db.prototype.selectRawQuery('', []);
            assert.equal(res.data.ok, true);
            stubExecuteQuery.restore();
        });
    });

    describe('insertRawQuery', () => {
        it('should return wrapper error when db function is error', async () => {
            stubExecuteQuery.rejects(new Error('Error Db function'));
            const res = await db.prototype.insertRawQuery('', []);
            assert.notEqual(res.err, null);
            stubExecuteQuery.restore();
        });
        it('should return wrapper data when insertRawQuery success', async () => {
            stubExecuteQuery.returns({});
            const res = await db.prototype.insertRawQuery('', []);
            assert.notEqual(res.data, null);
            stubExecuteQuery.restore();
        });
    });

    describe('updateRawQuery', () => {
        it('should return wrapper error when db function is error', async () => {
            stubExecuteQuery.rejects(new Error('Error Db function'));
            const res = await db.prototype.updateRawQuery('',[]);
            assert.notEqual(res.err, null);
            stubExecuteQuery.restore();
        });
        it('should return wrapper data when updateRawQuery success', async () => {
            stubExecuteQuery.returns({});
            const res = await db.prototype.updateRawQuery('', []);
            assert.notEqual(res.data, null);
            stubExecuteQuery.restore();
        });
    });


});