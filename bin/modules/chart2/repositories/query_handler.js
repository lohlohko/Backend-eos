const config = require('../../../infra/configs/global_config');
const DB = require('../../../helpers/databases/mongodb/db');
const db = new DB(config.get('/mongoDbUrl'));
const Domain = require('./domain')
const domain = new Domain(db);

const getScatterChart = async () => {
  return domain.getDataScatterChart();
}

const getTreemapChart = async () => {
  return domain.getDataTreeMapChart();
}
module.exports = {
  getScatterChart,
  getTreemapChart,
}