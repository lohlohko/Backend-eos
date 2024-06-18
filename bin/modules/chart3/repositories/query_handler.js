const config = require('../../../infra/configs/global_config');
const DB = require('../../../helpers/databases/mongodb/db');
const db = new DB(config.get('/mongoDbUrl'));
const Domain = require('./domain')
const domain = new Domain(db);

const getHeatmap = async () => {
  return domain.getDataHeatmap();
}
const getHeatmapModel = async () => {
  return domain.getDataHeatmapModel();
}
module.exports = {
  getHeatmap,
  getHeatmapModel,
}