const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
const queryHandler = require('../repositories/queries/query_handler');
const queryModel = require('../repositories/queries/query_model');
const validator = require('../../../helpers/utils/validator');
const { sendResponse } = require('../../../helpers/utils/response');

//query

const getUser = async (req, res) => {
  const { userMeta } = req;
  const payload = { userId: userMeta.userId };
  const validatePayload = validator.isValidPayload(payload, queryModel.getUser);
  if (validatePayload.err) {
    return sendResponse(validatePayload, res);
  }
  const result = await queryHandler.getUser(validatePayload.data);
  return sendResponse(result, res);
};

// command
const login = async (req, res) => {
  const payload = { ...req.body };
  const validatePayload = validator.isValidPayload(payload, commandModel.login);
  if (validatePayload.err) {
    return sendResponse(validatePayload, res);
  }
  const {data} = validatePayload;
  const result = await commandHandler.login({...data});
  return sendResponse(result, res);
};

const register = async (req, res) => {
  const payload = { ...req.body };
  const validatePayload = validator.isValidPayload(payload, commandModel.register);
  if (validatePayload.err) {
    return sendResponse(validatePayload, res);
  }
  const {data} = validatePayload;
  const result = await commandHandler.register({...data });
  return sendResponse(result, res);
};

module.exports = {
  getUser,
  login,
  register
};
