const sinon = require('sinon');
const api = require('../../../../../bin/modules/sample/handlers/api_handler');
const queryHandler = require('../../../../../bin/modules/sample/repositories/queries/query_handler');
const commandHandler = require('../../../../../bin/modules/sample/repositories/commands/command_handler');
const validator = require('../../../../../bin/helpers/utils/validator');

describe('sample-apihandler', () => {
  const res = {
    send: sinon.stub()
  };

  const resultSuccess = {
    err: null,
    message: '',
    data: {
      sampleId: 'f362097e-d444-4d70-ba72-cdc941b36c13',
      sampleName: 'sample'
    },
    code: 200
  };

  describe('postSample', () => {
    it('Should fail validate param', async () => {
      const req = {
        params: {
          sampleId: 'f362097e-d444-4d70-ba72-cdc941b36c13',
        },
        body: {
          sampleName: 'sample'
        },
        userMeta: {}
      };
      sinon.stub(validator, 'isValidPayload').returns({
        err: {},
        data: {}
      });
      api.postSample(req, res);
      validator.isValidPayload.restore();
    });
    it('Should success createSample', async () => {
      const req = {
        params: {
          sampleId: 'f362097e-d444-4d70-ba72-cdc941b36c13',
        },
        body: {
          sampleName: 'sample'
        },
        userMeta: {}
      };
      sinon.stub(validator, 'isValidPayload').returns({
        err: null,
        data: {}
      });
      sinon.stub(commandHandler, 'postSample').resolves(resultSuccess);
      api.postSample(req, res);
      commandHandler.postSample.restore();
      validator.isValidPayload.restore();
    });
  });

  describe('updateSample', () => {
    it('Should fail validate param', async () => {
      const req = {
        params: {
          sampleId: 'f362097e-d444-4d70-ba72-cdc941b36c13',
        },
        body: {},
        userMeta: {}
      };
      sinon.stub(validator, 'isValidPayload').returns({ err: true });
      api.updateSample(req, res);
      validator.isValidPayload.restore();
    });
    it('Should success updateSample', async () => {
      const req = {
        params: {
          sampleId: 'f362097e-d444-4d70-ba72-cdc941b36c13',
        },
        body: {},
        userMeta: {}
      };
      sinon.stub(commandHandler, 'updateSample').resolves(resultSuccess);
      sinon.stub(validator, 'isValidPayload').returns({
        err: null,
        data: {}
      });
      api.updateSample(req, res);
      validator.isValidPayload.restore();
      commandHandler.updateSample.restore();
    });
  });

  describe('getSample', () => {
    it('Should fail validate param', async () => {
      const req = {
        params: {
          sampleId: 'f362097e-d444-4d70-ba72-cdc941b36c13',
        }
      };
      sinon.stub(validator, 'isValidPayload').returns({ err: true });
      api.getSample(req, res);
      validator.isValidPayload.restore();
    });
    it('Should success getSample', async () => {
      const req = {};
      sinon.stub(queryHandler, 'getSample').resolves(resultSuccess);
      sinon.stub(validator, 'isValidPayload').returns({
        err: null,
        data: {}
      });
      api.getSample(req, res);
      validator.isValidPayload.restore();
      queryHandler.getSample.restore();
    });
  });

  describe('listSample', () => {
    it('Should fail validate param', async () => {
      const req = {
        params: {
          isDeleted: false,
        },
        body: {},
        userMeta: {}
      };
      sinon.stub(validator, 'isValidPayload').returns({ err: true });
      api.listSample(req, res);
      validator.isValidPayload.restore();
    });
    it('Should success listSample', async () => {
      const req = {
        params: {
          isDeleted: false,
        },
        body: {},
        userMeta: {}
      };
      sinon.stub(validator, 'isValidPayload').returns({
        err: null,
        data: {}
      });
      sinon.stub(queryHandler, 'listSample').resolves(resultSuccess);
      api.listSample(req, res);
      validator.isValidPayload.restore();
      queryHandler.listSample.restore();
    });
  });

});
