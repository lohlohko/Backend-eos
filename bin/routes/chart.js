const charthandler = require('../modules/chart/handlers/api_handler')
const charthandler2 = require('../modules/chart2/handlers/api_handler')
const charthandler3 = require('../modules/chart3/handlers/api_handler')
const charthandler4 = require('../modules/chart4/handlers/api_handler')
const OAuth2Middleware = require('../helpers/middlewares/OAuthMiddlewares');
const asyncMiddleware = require('../helpers/utils/middlewareWrapper');

module.exports = (server) => {
  server.get('/codebase/v1/normaltable',asyncMiddleware(OAuth2Middleware.checkCredentials), charthandler.getDataNormalTable)
  server.get('/codebase/v1/barchart',asyncMiddleware(OAuth2Middleware.checkCredentials), charthandler.getDataBarChart)
  server.get('/codebase/v1/piechart',asyncMiddleware(OAuth2Middleware.checkCredentials), charthandler.getDataPieChart)
  server.get('/codebase/v1/doughnutchart',asyncMiddleware(OAuth2Middleware.checkCredentials),charthandler.getDataDoughnutChart)
  server.get('/codebase/v1/linechart',asyncMiddleware(OAuth2Middleware.checkCredentials), charthandler.getDataLineChart)
  server.get('/codebase/v1/scatterplot',asyncMiddleware(OAuth2Middleware.checkCredentials),charthandler2.getDataScatterChart)
  server.get('/codebase/v1/treemap',asyncMiddleware(OAuth2Middleware.checkCredentials), charthandler2.getDataTreemapChart)
  server.get('/codebase/v1/heatmap',asyncMiddleware(OAuth2Middleware.checkCredentials), charthandler3.getDataHeatmap)
  server.get('/codebase/v1/heatmapmodel',asyncMiddleware(OAuth2Middleware.checkCredentials), charthandler3.getDataHeatmapWithModel)
  server.get('/codebase/v1/stackedbar',asyncMiddleware(OAuth2Middleware.checkCredentials), charthandler4.getStackedBarChart)
  server.get('/codebase/v1/groupedbar',asyncMiddleware(OAuth2Middleware.checkCredentials), charthandler4.getGroupedBarChart)
};