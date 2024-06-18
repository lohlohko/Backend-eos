const logger = require('../../../../helpers/utils/logger');
const wrapper = require('../../../../helpers/utils/wrapper');
const { UnauthorizedError, NotFoundError, ConflictError, InternalServerError } = require('../../../../helpers/error');
const ctx = 'User-Command-Domain';
const { Collection } = require('mongodb');
const Query = require('./query');
const {transformStackeBarChart, transformGroupedBarChart} = require('../../../../helpers/utils/chart_helper');
const collectionName = 'stackedbar';
class Chart{

  constructor(db){
    this.query = new Query(db);
  }
  async getDataStackedBarChart() {
    const response = await this.query.findMany({},null,null,1,0,collectionName);
    if (response.err) {
      logger.error(ctx, response.err, 'can not find list');
      return wrapper.error(new InternalServerError('Internal Server Error'));
    }
    const title = 'Data for StackedBarChart';
    const tooltip = 'Data for StackedBarChart';
    return wrapper.data(transformStackeBarChart(response.data, title,tooltip,'category'));
  }
  async getDataGroupedBarChart() {
    const response = await this.query.findMany({},null,null,1,0,collectionName);
    if (response.err) {
      logger.error(ctx, response.err, 'can not find list');
      return wrapper.error(new InternalServerError('Internal Server Error'));
    }
    const title = 'Data for GroupedBarChart';
    const tooltip = 'Data for GroupedBarChart';
    return wrapper.data(transformGroupedBarChart(response.data, title,tooltip,'category'));
  }
}
//     async getBarChart() {

//     const mudik = await this.query.findMany({},null,null,1,0,'barChart');
//     if (mudik.err) {
//       logger.error(ctx, mudik.err, 'can not find list mudik');
//       return wrapper.error(new NotFoundError('can not find list mudik'))
//     }

//     return wrapper.data(mudik);
//   }


module.exports = Chart;
