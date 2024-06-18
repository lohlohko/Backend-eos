const Company = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo (config.get('/mongoDbUrl'));
const company = new Company(db);

const createCompany = (payload) => {
  return company.createCompany(payload);
};

const updateCompany = async (payload) => {
  return company.updateCompany(payload);
};

module.exports = {
  createCompany,
  updateCompany
};
