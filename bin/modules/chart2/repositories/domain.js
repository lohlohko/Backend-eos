const logger = require('../../../helpers/utils/logger');
const wrapper = require('../../../helpers/utils/wrapper');
const { UnauthorizedError, NotFoundError, ConflictError, InternalServerError } = require('../../../helpers/error');
const ctx = 'User-Command-Domain';
const { Collection } = require('mongodb');
const Query = require('./query');
const {transformScatterChart,transformTreeMapChart} = require('../../../helpers/utils/chart_helper');
const collectionName = 'scatterChart';

class Chart2{
  constructor(db){
    this.query = new Query(db);
}
  async getDataScatterChart () {
    
    const response = await this.query.findMany({},null,null,1,0,collectionName);
    if (response.err) {logger.error(ctx, response.err, 'can not find list');return wrapper.error(new InternalServerError('Internal Server Error'));
    }
    const title = 'Data for scatterChart';
    const tooltip = 'Data for scatterChart';
    const label = 'category';
    const xAxis = 'TEAM 1';
    const yAxis = 'TEAM 2';
    return wrapper.data(transformScatterChart(response.data, title,tooltip,label,xAxis,yAxis));

  }
  async getDataTreeMapChart() {
    
    const response = await this.query.findMany({},null,null,1,0,collectionName);
    if (response.err) {logger.error(ctx, response.err, 'can not find list');return wrapper.error(new InternalServerError('Internal Server Error'));
    }
    const title = 'Data for treemapChart';
    const tooltip = 'Data for treemapChart';
    const label = '';
    const xAxis = 'category';
    const yAxis = 'TEAM 1';
    return wrapper.data(transformTreeMapChart(response.data, title,tooltip,label,xAxis,yAxis));

  }
}
module.exports = Chart2;