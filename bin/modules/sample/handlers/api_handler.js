
const commandHandler = require('../repositories/commands/command_handler');
const queryHandler = require('../repositories/queries/query_handler');
const commandModel = require('../repositories/commands/command_model');
const queryModel = require('../repositories/queries/query_model');
const validator = require('../../../helpers/utils/validator');
const { sendResponse, paginationResponse } = require('../../../helpers/utils/response');

// Command

const postSample = async (req, res) => {
  const payload = { ...req.body };
  const isValid = validator.isValidPayload(payload, commandModel.createSampleSchema());
  if (isValid.err) {
    return sendResponse(isValid, res);
  }
  const { data } = isValid;
  const result = await commandHandler.postSample({ ...data });
  return sendResponse(result, res);
};

const updateSample = async (req, res) => {
  const payload = { ...req.body, ...req.params };
  const isValid = validator.isValidPayload(payload, commandModel.updateSampleSchema());
  if (isValid.err) {
    return sendResponse(isValid, res);
  }
  const { data } = isValid;
  const result = await commandHandler.updateSample({ ...data });
  return sendResponse(result, res);
};

const uploadImage = async (req, res) => {
  const data = { ...req.body, ...req.params, ...req.files };
  const result = await commandHandler.uploadImage({ ...data });
  return sendResponse(result, res);
};

// Query

const getSample = async (req, res) => {
  const { params } = req;
  const isValid = validator.isValidPayload(params, queryModel.getSample);
  if (isValid.err) {
    return sendResponse(isValid, res);
  }
  const { data } = isValid;
  const result = await queryHandler.getSample({ ...data });
  return sendResponse(result, res);
};

const listSample = async (req, res) => {
  const { query } = req;
  const isValid = validator.isValidPayload(query, queryModel.listSample);
  if (isValid.err) {
    return sendResponse(isValid, res);
  }
  const { data } = isValid;
  const result = await queryHandler.listSample({ ...data });
  return paginationResponse(result, res);
};

const countSample = async (req, res) => {
  const { query } = req;
  const isValid = validator.isValidPayload(query, queryModel.listSample);
  if (isValid.err) {
    return sendResponse(isValid, res);
  }
  const { data } = isValid;
  const result = await queryHandler.countSample({ ...data });
  return sendResponse(result, res);
};

const deleteSample = async (req, res) => {
  const payload = { ...req.body, ...req.params };
  const isValid = validator.isValidPayload(payload, commandModel.deleteSampleSchema());
  if (isValid.err) {
    return sendResponse(isValid, res);
  }
  const { data } = isValid;
  const result = await commandHandler.updateSample({ ...data });
  return sendResponse(result, res);
};

module.exports = {
  postSample,
  updateSample,
  uploadImage,
  getSample,
  listSample,
  countSample,
  deleteSample
};
