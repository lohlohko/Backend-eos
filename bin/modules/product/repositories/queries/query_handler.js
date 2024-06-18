const Domain = require('./domain');
const config = require('../../../../infra/configs/global_config');
const DB = require('../../../../helpers/databases/mongodb/db');
const db = new DB(config.get('/mongoDbUrl'));
const domain = new Domain(db);

const getProduct = async (payload) => {
  return domain.getProduct(payload);
};

const listProduct = async (payload) => {
  return domain.listProduct(payload);
};

module.exports = {
  getProduct,
  listProduct,
};
