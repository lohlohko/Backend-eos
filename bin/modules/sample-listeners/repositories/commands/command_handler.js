
const Sample = require('./domain');
const config = require('../../../../infra/configs/global_config');

// Mongo
const DB = require('../../../../helpers/databases/mongodb/db');
const db = new DB(config.get('/mongoDbUrl'));

//Postgree
// const DB = require('../../../../helpers/databases/postgresql/db');
// const db = new DB(config.get('/postgresqlUrl'));

// MYSQL
//const DB = require('../../../../helpers/databases/mysql/db');
// const db = new DB(config.get('/mysqlConfig'));

const sample = new Sample(db);

const postSample = async (payload) => {
  return sample.postSample(payload);
};

const updateSample = async (payload) => {
  return sample.updateSample(payload);
};
module.exports = {
  postSample,
  updateSample,
};
