
const logger = require('../../../../helpers/utils/logger');
const wrapper = require('../../../../helpers/utils/wrapper');
const { InternalServerError } = require('../../../../helpers/error');
const CommandSample = require('./command');

const ctx = 'Sample-Command-Domain';

class Sample {

  constructor(db) {
    this.commandSample = new CommandSample(db);
  }

  async postSample(payload) {
    const { ...payloadProperties } = payload;
    const document = { ...payloadProperties };
    const result = await this.commandSample.insertOne(document);
    if (result.err) {
      logger.error(ctx, result.err, 'can not insert sample');
      return wrapper.error(new InternalServerError('can not insert sample'));
    }
    return wrapper.data(document);
  }

  async updateSample(payload) {
    const { sampleId, ...payloadProperties } = payload;
    const params = { sampleId: sampleId };
    const result = await this.commandSample.updateOne(params, payloadProperties);
    if (result.err) {
      logger.error(ctx, result.err, 'can not update sample');
      return wrapper.error(new InternalServerError('can not update sample'));
    }
    return wrapper.data(payloadProperties);
  }

}

module.exports = Sample;
