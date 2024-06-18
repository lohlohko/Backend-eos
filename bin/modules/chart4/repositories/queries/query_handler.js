const config = require('../../../../infra/configs/global_config');
const DB = require('../../../../helpers/databases/mongodb/db');
const db = new DB(config.get('/mongoDbUrl'));
const Domain = require('./domain')
const domain = new Domain(db);
const getStackedBarChart = async () => {
  return domain.getDataStackedBarChart();
};

const getGroupedBarChart = async () => {
  return domain.getDataGroupedBarChart();
};
module.exports = {
  getStackedBarChart,
  getGroupedBarChart,

}