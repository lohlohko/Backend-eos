const commandHandler = require('../repositories/commands/command_handler');
const queryHandler = require('../repositories/queries/query_handler');
const commandModel = require('../repositories/commands/command_model');
const queryModel = require('../repositories/queries/query_model');
const validator = require('../../../helpers/utils/validator');
const { sendResponse} = require('../../../helpers/utils/response');


//commands

const postMudik = async (req, res) => {
  const payload = { ...req.body };
  const isValid = validator.isValidPayload(payload, commandModel.createMudikSchema);
  if (isValid.err) {
    return sendResponse(isValid, res);
  }
  const { data } = isValid;
  // apmSpan.end();
  const result = await commandHandler.postMudik({ ...data });
  return sendResponse(result, res);
};

const updateMudik = async (req, res) => {
  const payload = { ...req.body, ...req.params};
  const isValid = validator.isValidPayload(payload, commandModel.updateMudikSchema);
  if (isValid.err) {
    return sendResponse(isValid, res);
  }
  const { data } = isValid;
  const result = await commandHandler.updateMudik({ ...data });
  return sendResponse(result, res);
}
//query
const listMudik = async (req,res) => {
  const result = await queryHandler.listMudik();
  return sendResponse(result, res);
} 

const getMudikById = async (req,res) => {
  const { params } = req;
  const isValid = validator.isValidPayload(params, queryModel.getDataMudik);
  if (isValid.err) {
    return sendResponse(isValid, res);
  }
  const { data } = isValid;
  const result = await queryHandler.getMudikById({ ...data });
  return sendResponse(result, res);
}

const getDataMudikById = async (req,res) => {
  const { params } = req;
  const isValid = validator.isValidPayload(params, queryModel.getDataMudikById);
  if (isValid.err) {
    return sendResponse(isValid, res);
  }
  const { data } = isValid;
  const result = await queryHandler.getDataMudikById({...data});
  return sendResponse(result, res);
} 

const deleteMudik = async (req,res) => {
  const { params } = req;
  const isValid = validator.isValidPayload(params, commandModel.deleteMudikSchema);
  if (isValid.err) {
    return sendResponse(isValid, res);
  }
  const { data } = isValid;
  const result = await commandHandler.deleteMudik({...data});
  return sendResponse(result, res);
} 



module.exports ={
  postMudik,
  updateMudik,
  listMudik,
  getMudikById,
  getDataMudikById,
  deleteMudik,
} 