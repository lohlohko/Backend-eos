const queryHandler = require('../repositories/queries/query_handler');
const queryModel = require('../repositories/queries/query_model');
const validator = require('../../../helpers/utils/validator');
const { sendResponse} = require('../../../helpers/utils/response');

// const getDataBarChart = async (req, res) => {
//     const payload = { ...req.query };
//     const validatePayload = validator.isValidPayload(payload, queryModel.barChart);
//     if (validatePayload.err) {
//       return sendResponse(validatePayload, res);
//     }
//     const result = await queryHandler.getBarChart(validatePayload.data);
//     return sendResponse(result, res);
//   };
const getDataBarChart = async (req,res) => {
  const result = await queryHandler.getBarChart();
  return sendResponse(result, res);
}
const getDataPieChart = async (req,res) => {
  const result = await queryHandler.getPieChart();
  return sendResponse(result, res);
}

const getDataDoughnutChart = async (req,res) => {
  const result = await queryHandler.getDoughnutChart();
  return sendResponse(result, res);
}

const getDataLineChart = async (req,res) => {
  const result = await queryHandler.getLineChart();
  return sendResponse(result, res);
}
const getDataNormalTable = async (req,res) => {
  const result = await queryHandler.getNormalTable();
  return sendResponse(result, res);
}
// const getDataTreemap = async (req,res) => {
//   const result = await queryHandler.
// }

// const barChart = async (req, res) => {
//     try {
//     const data = req.query.data;
//     const model = req.query.model;
//     const title = req.query.title;
//     const tooltip = req.query.tooltip;
//     const transformData = transformBarChart (data, model, title, tooltip);
    
//     res.json(transformData);
// } catch (error){
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
//   };
module.exports = {
  getDataBarChart,
  getDataPieChart,
  getDataLineChart,
  getDataNormalTable,
  getDataDoughnutChart,
}