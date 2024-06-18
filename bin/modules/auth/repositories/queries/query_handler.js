
const Auth = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));
const auth = new Auth(db);

const getAuth = async (payload) => {
  return auth.viewAuth(payload);
};

module.exports = {
  getAuth
};
