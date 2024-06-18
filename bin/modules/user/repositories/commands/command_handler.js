const config = require('../../../../infra/configs/global_config');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const db = new Mongo(config.get('/mongoDbUrl'));
const User = require('./domain');
const user = new User(db);


const login = async (payload) => {
  return user.login(payload);
};

const register = async (payload) => {
  return user.register(payload);
};

const addUser = async (payload) => {
  const postCommand = async payload => user.directAddUser(payload);
  return postCommand(payload);
};

const updateUser = async (payload) => {
  const postCommand = async (payload) => user.directUpdateUser(payload);
  return postCommand(payload);
};

module.exports = {
  login,
  register,
  addUser,
  updateUser,
};
