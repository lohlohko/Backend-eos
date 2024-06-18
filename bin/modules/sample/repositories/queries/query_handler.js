const Sample = require('./domain');
const config = require('../../../../infra/configs/global_config');

// Mongo
const DB = require('../../../../helpers/databases/mongodb/db');
const db = new DB(config.get('/mongoDbUrl'));

// Postgre
// const DB = require('../../../../helpers/databases/postgresql/db');
// const db = new DB(config.get('/postgresqlUrl'));
// const db = new DB(config.get('/postgresqlUrl2'));

// MYSQL
// const DB = require('../../../../helpers/databases/mysql/db');
// const db = new DB(config.get('/mysqlConfig'));

const sample = new Sample(db);

const getSample = async (payload) => {
  return sample.getSample(payload);
};

const listSample = async (payload) => {
  return sample.listSample(payload);
};

const countSample = async (payload) => {
  return sample.countSample(payload);
};

module.exports = {
  getSample,
  listSample,
  countSample,
};
