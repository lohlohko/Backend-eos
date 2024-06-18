const commandHandler = require('../repositories/commands/command_handler');

const postSample = async (payload) => {
  return commandHandler.postSample(payload);
};

const updateSample = async (payload) => {
  return commandHandler.updateSample(payload);
};

module.exports = {
  postSample,
  updateSample
};
