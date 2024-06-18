const commandHandler = require('../repositories/commands/command_handler');

const createCompany = async (payload) => {
  return commandHandler.createCompany(payload);
};

const updateCompany = async (message) => {
  return commandHandler.updateCompany(message);
};

module.exports = {
  createCompany,
  updateCompany
};
