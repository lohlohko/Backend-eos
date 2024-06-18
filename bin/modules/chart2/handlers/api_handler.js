const queryHandler = require('../repositories/query_handler');
const queryModel = require('../repositories/query_model');
const validator = require('../../../helpers/utils/validator');
const { sendResponse} = require('../../../helpers/utils/response');


const getDataScatterChart = async (req,res) => {
  const result = await queryHandler.getScatterChart();
  return sendResponse(result, res);
};

const getDataTreemapChart = async (req,res) => {
  const result = await queryHandler.getTreemapChart();
  return sendResponse(result, res);
};

module.exports = {
  getDataScatterChart,
  getDataTreemapChart,
}