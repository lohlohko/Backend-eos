const logger = require('../../../helpers/utils/logger');
const wrapper = require('../../../helpers/utils/wrapper');
const { UnauthorizedError, NotFoundError, ConflictError, InternalServerError } = require('../../../helpers/error');
const ctx = 'User-Command-Domain';
const { Collection } = require('mongodb');
const Query = require('./query');
const {transdormHeatmapWithModel, transdormHeatmapChart} = require('../../../helpers/utils/chart_helper');
const {heatmapModel} = require('../repositories/data_model');
const { addLabels } = require('elastic-apm-node');
const collectionName = 'colorrange';

class Chart3{
  constructor(db){
    this.query = new Query(db);
}
  

  async getDataHeatmap(){
    const response = await this.query.findMany({},null,null,1,0,collectionName);
    if (response.err) {logger.error(ctx, response.err, 'can not find list');return wrapper.error(new InternalServerError('Internal Server Error'));
    }
    const tooltip = 'Data for Heatmap';
    const title = 'Data for Heatmap';
    const label = 'Data for Heatmap';
    const result = transdormHeatmapChart(response.data,title,tooltip,label);
    return wrapper.data(result);
  }

  async getDataHeatmapModel(){
    const response = await this.query.findMany({},null,null,1,0,collectionName);
    if (response.err) {logger.error(ctx, response.err, 'can not find list');return wrapper.error(new InternalServerError('Internal Server Error'));
    }
    const tooltip = 'Data for Heatmap';
    const title = 'Data for Heatmap';
    const result = transdormHeatmapWithModel(response.data,heatmapModel,title,tooltip);
    return wrapper.data(result);
  }
}
module.exports = Chart3;