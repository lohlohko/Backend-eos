const assert = require('assert');
const sinon = require('sinon');

const Command = require('../../../../../../bin/modules/user/repositories/commands/command');

describe('User-command', () => {

  describe('insertOneUser', () => {
    const queryResult = {
      'err': null,
      'data': {
        '_id': '5bac53b45ea76b1e9bd58e1c',
        'username': 'username',
        'password': 'password'
      }
    };

    it('should success to insert data to db', async() => {

      const db = {
        insertOne: sinon.stub().resolves(queryResult),
        setCollection: sinon.stub()
      };
      const command = new Command(db);
      const res = await command.insertOne({});
      assert.equal(res.data.username, queryResult.data.username);
    });
  });

  describe('upsertOne', () => {
    const queryResult = {
      'err': null,
      'data': {
        '_id': '5bac53b45ea76b1e9bd58e1c',
        'username': 'username',
        'password': 'password'
      }
    };

    it('should success to insert data to db', async() => {

      const db = {
        upsertOne: sinon.stub().resolves(queryResult),
        setCollection: sinon.stub()
      };
      const command = new Command(db);
      const res = await command.upsertOne({}, {});
      assert.equal(res.data.username, queryResult.data.username);
    });
  });

});
