const commandHandler = require('../repositories/commands/command_handler');

const addUser = async (payload) => {
  return commandHandler.addUser(payload);
};

const updateUser = async (payload) => {
  return commandHandler.updateUser(payload);
};

module.exports = {
  addUser,
  updateUser
};
