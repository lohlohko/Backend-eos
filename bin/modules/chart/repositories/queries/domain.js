const logger = require('../../../../helpers/utils/logger');
const wrapper = require('../../../../helpers/utils/wrapper');
const { UnauthorizedError, NotFoundError, ConflictError, InternalServerError } = require('../../../../helpers/error');
const ctx = 'User-Command-Domain';
const { Collection } = require('mongodb');
const Query = require('./query');
const {transformBarChart, transformPieChart, transformLineChart,transfromNormalTable, 
  transformDoughnutChart} = require('../../../../helpers/utils/chart_helper');
const collectionName = 'barChart';
class Chart{

  constructor(db){
    this.query = new Query(db);
  }


  async getDataBarChart() {
    const response = await this.query.findMany({},null,null,1,0,collectionName);
    if (response.err) {
      logger.error(ctx, response.err, 'can not find list mudik');
      return wrapper.error(new InternalServerError('Internal Server Error'));
    }
    const title = 'Data for Barchart';
    const tooltip = 'Data for Barchart';
    return wrapper.data(transformBarChart(response.data, title,tooltip,'series0'));
  }
  async getDataPieChart() {
    const response = await this.query.findMany({},null,null,1,0,collectionName);
    if (response.err) {
      logger.error(ctx, response.err, 'can not find list');
      return wrapper.error(new InternalServerError('Internal Server Error'));
    }
    const title = 'Data for PieChart';
    const tooltip = 'Data for PieChart';
    return wrapper.data(transformPieChart(response.data, title,tooltip,'series0'));
  }
  async getDataDoughnutChart() {
    const response = await this.query.findMany({},null,null,1,0,collectionName);
    if (response.err) {
      logger.error(ctx, response.err, 'can not find list');
      return wrapper.error(new InternalServerError('Internal Server Error'));
    }
    const title = 'Data for DoughnutChart';
    const tooltip = 'Data for DoughnutChart';
    return wrapper.data(transformDoughnutChart(response.data, title,tooltip,'series0'));
  }
  async getDataLineChart() {
    const response = await this.query.findMany({},null,null,1,0,collectionName);
    if (response.err) {
      logger.error(ctx, response.err, 'can not find list');
      return wrapper.error(new InternalServerError('Internal Server Error'));
    }
    const title = 'Data for lineChart';
    const tooltip = 'Data for lineChart';
    return wrapper.data(transformLineChart(response.data, title,tooltip,'category'));
  }

  async getDataNormalTable() {
    const response = await this.query.findMany({},null,null,1,0,collectionName);
    if (response.err) {
      logger.error(ctx, response.err, 'can not find list mudik');
      return wrapper.error(new InternalServerError('Internal Server Error'));
    }
    const title = 'Data for Normal Table';
    const tooltip = 'Data for Normal Table';
    return wrapper.data(transfromNormalTable(response.data, title,tooltip,'series0'));
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
