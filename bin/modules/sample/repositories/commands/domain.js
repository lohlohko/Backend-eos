
const logger = require('../../../../helpers/utils/logger');
const wrapper = require('../../../../helpers/utils/wrapper');
const { InternalServerError } = require('../../../../helpers/error');
// const Storaging = require('../../../../helpers/components/storaging');

const CommandSample = require('./command');
const QuerySample = require('../queries/query');

const ctx = 'Sample-Command-Domain';

class Sample {

  constructor(db) {
    this.commandSample = new CommandSample(db);
    this.querySample = new QuerySample(db);
  }

  async postSample(payload) {
    const { ...payloadProperties } = payload;
    const document = { ...payloadProperties };

    // insertRawQuery example

    // PostgreSQL ref https://node-postgres.com/features/queries#parameterized-query
    // const result = await this.commandSample.insertRawQuery(
    //   'INSERT INTO SAMPLE(sampleid, samplename) VALUES($1, $2) RETURNING *', [payload.sampleId, payload.sampleName]
    // );

    // MYSQL ref https://www.npmjs.com/package/mysql#performing-queries
    // const result = await this.commandSample.insertRawQuery('INSERT INTO SAMPLE SET ?', [payload]);

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

    // updateRawQuery example

    // PostgreSQL ref https://node-postgres.com/features/queries#parameterized-query
    // const result = await this.commandSample.updateRawQuery(
    //   'UPDATE SAMPLE SET samplename = $1 WHERE sampleid = $2 RETURNING *', [payload.sampleName, payload.sampleId]
    // );

    // MYSQL Example. ref https://www.npmjs.com/package/mysql#performing-queries
    // const result = await this.commandSample.updateRawQuery(
    //   "UPDATE SAMPLE SET samplename = ? WHERE sampleid = ?", [payload.sampleName, payload.sampleId]
    // );

    const result = await this.commandSample.updateOne(params, payloadProperties);
    if (result.err) {
      logger.error(ctx, result.err, 'can not update sample');
      return wrapper.error(new InternalServerError('can not update sample'));
    }
    return wrapper.data(payloadProperties);
  }

  async uploadImage(payload) {
    const sampleId = 'sampleId';
    const uploadResult = await this.Storaging.uploadDocument({
      rawFile: payload.sampleFile,
      name: `sampleName-${sampleId}`,
      folder: 'myfolder',
      bucket: 'mybucket'
    });
    if (uploadResult.err) {
      logger.error(ctx, 'uploadImage', uploadResult.err);
      return wrapper.error(new InternalServerError('Tidak dapat mengupload dokumen'));
    }
    return wrapper.data(uploadResult.uri);
  }

}

module.exports = Sample;
