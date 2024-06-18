
const config = require('../../../../infra/configs/global_config');
const DB = require('../../../../helpers/databases/mongodb/db');
const db = new DB(config.get('/mongoDbUrl'));
const Domain = require('./domain');
const domain = new Domain(db);
const { trace } = require('@opentelemetry/api');
// const apm_span = require('../../../../helpers/utils/apm_span');

const postProduct = async (payload) => {
  const apm = trace.getTracer('command handler').startSpan('postProduct');
  const result = await domain.postProduct(payload);
  apm.end();
  return result;
};

const updateProduct = async (payload) => {
  return domain.updateProduct(payload);
};

const uploadImage = async (payload) => {
  return domain.uploadImage(payload);
};

module.exports = {
  postProduct,
  updateProduct,
  uploadImage
};
