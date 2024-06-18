const config = require('../../../../infra/configs/global_config');
const DB = require('../../../../helpers/databases/mongodb/db');
const db = new DB(config.get('/mongoDbUrl'));
const Domain = require('./domain')
const domain = new Domain(db);

const getBarChart = async () => {
  return domain.getDataBarChart();
};

const getPieChart = async () => {
  return domain.getDataPieChart();
}

const getDoughnutChart = async () => {
  return domain.getDataDoughnutChart();
}
const getLineChart = async () => {
  return domain.getDataLineChart();
};

const getNormalTable = async () => {
  return domain.getDataNormalTable();
}



module.exports = {
  getBarChart,
  getPieChart,
  getLineChart,
  getNormalTable,
  getDoughnutChart,
}