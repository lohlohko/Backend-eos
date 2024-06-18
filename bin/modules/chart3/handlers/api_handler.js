const queryHandler = require('../repositories/query_handler');
const queryModel = require('../repositories/query_model');
const validator = require('../../../helpers/utils/validator');
const { sendResponse} = require('../../../helpers/utils/response');

const getDataHeatmap = async (req,res) => {
  const result = await queryHandler.getHeatmap();
  return sendResponse(result, res);
}
const getDataHeatmapWithModel = async (req,res) => {
  const result = await queryHandler.getHeatmapModel();
  return sendResponse(result, res);
}


// const getDataHeatmapModel = async (req,res) => {
//   const { params } = req;
//   const isValid = validator.isValidPayload(params, queryModel.Heatmap);
//   if (isValid.err){
//     return sendResponse(isValid,res)
//   }
//   const { data } = isValid;
//   const result = await queryHandler.getHeatmapModel({...data});
//   return sendResponse(result, res);
// }

module.exports = {
  getDataHeatmap,
  getDataHeatmapWithModel,
}