
const wrapper = require('../../../../helpers/utils/wrapper');
const logger = require('../../../../helpers/utils/logger');
const { NotFoundError } = require('../../../../helpers/error');
const QuerySample = require('./query');
const ctx = 'Sample-Query-Domain';

class Sample {

  constructor(db) {
    this.querySample = new QuerySample(db);
  }

  async getSample(payload) {
    // selectRawQuery example

    // PostgreSQL ref https://node-postgres.com/features/queries#parameterized-query
    // const sample = await this.querySample.selectRawQuery(
    //   'select sampleid, sampleName from sample where sampleid = $1 and isactive = $2', [payload.sampleId, true]
    // );

    // MYSQL ref https://www.npmjs.com/package/mysql#performing-queries
    // const sample = await this.querySample.selectRawQuery(
    //   "select sampleid, sampleName from sample where sampleid = ? and isactive = ?", [payload.sampleId, true]
    // );

    const sample = await this.querySample.findOne({ sampleId: payload.sampleId }, { sampleId: 1, sampleName: 1 });
    if (sample.err) {
      logger.error(ctx, sample.err, 'can not find sample');
      return wrapper.error(new NotFoundError('can not find sample'));
    }
    const { data } = sample;
    return wrapper.data(data);
  }

  async listSample(payload) {
    const {page, limit, ...payloadProperties} = payload;
    const query = {...payloadProperties};
    const projection = {
      sampleId: 1,
      sampleName: 1,
    };
    const sort = { createdAt : -1 };
    const sample = await this.querySample.findMany(query, projection, sort, page, limit);
    if (sample.err) {
      logger.warn(ctx, sample.err, 'can not find list sample');
      sample.data = [];
    }
    const { data } = sample;
    return wrapper.data(data);
  }

  async countSample(payload) {
    const query = {};
    const sample = await this.querySample.count(query);
    if (sample.err) {
      logger.error(ctx, sample.err, 'can not find sample');
      return wrapper.error(new NotFoundError('can not find sample'));
    }
    const { data } = sample;
    return wrapper.data(data);
  }

}


module.exports = Sample;
