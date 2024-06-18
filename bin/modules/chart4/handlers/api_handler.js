const queryHandler = require('../repositories/queries/query_handler');
const queryModel = require('../repositories/queries/query_model');
const validator = require('../../../helpers/utils/validator');
const { sendResponse} = require('../../../helpers/utils/response');

const getStackedBarChart = async (req,res) => {
  const result = await queryHandler.getStackedBarChart();
  return sendResponse(result, res);
}

const getGroupedBarChart = async (req,res) => {
  const result = await queryHandler.getGroupedBarChart();
  return sendResponse(result, res);
}


module.exports = {
  getStackedBarChart,
  getGroupedBarChart,
}