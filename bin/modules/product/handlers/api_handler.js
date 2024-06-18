
const commandHandler = require('../repositories/commands/command_handler');
const queryHandler = require('../repositories/queries/query_handler');
const commandModel = require('../repositories/commands/command_model');
const queryModel = require('../repositories/queries/query_model');
const validator = require('../../../helpers/utils/validator');
const { sendResponse, paginationResponse } = require('../../../helpers/utils/response');
const { trace } = require('@opentelemetry/api');

// Command
const postProduct = async (req, res) => {
  // const apmSpan = trace.getTracer('api handler').startSpan('postProduct');
  const payload = { ...req.body };
  const isValid = validator.isValidPayload(payload, commandModel.createProductSchema());
  if (isValid.err) {
    return sendResponse(isValid, res);
  }
  const { data } = isValid;
  // apmSpan.end();
  const result = await commandHandler.postProduct({ ...data });
  return sendResponse(result, res);
};

const updateProduct = async (req, res) => {
  const payload = { ...req.body, ...req.params, ...req.files };
  const isValid = validator.isValidPayload(payload, commandModel.updateProductSchema());
  if (isValid.err) {
    return sendResponse(isValid, res);
  }
  const { data } = isValid;
  const result = await commandHandler.updateProduct({ ...data });
  return sendResponse(result, res);
};

// Query
const getProduct = async (req, res) => {
  const { params } = req;
  const isValid = validator.isValidPayload(params, queryModel.getProduct);
  if (isValid.err) {
    return sendResponse(isValid, res);
  }
  const { data } = isValid;
  const result = await queryHandler.getProduct({ ...data });
  return sendResponse(result, res);
};

const listProduct = async (req, res) => {
  const { query } = req;
  const isValid = validator.isValidPayload(query, queryModel.listProduct);
  if (isValid.err) {
    return sendResponse(isValid, res);
  }
  const { data } = isValid;
  const result = await queryHandler.listProduct({ ...data });
  return paginationResponse(result, res);
};

module.exports = {
  postProduct,
  updateProduct,
  getProduct,
  listProduct,
};
