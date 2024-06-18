const User = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));
const user = new User(db);

const getUser = async (payload) => {
  return user.viewUser(payload);
};

module.exports = {
  getUser
};
