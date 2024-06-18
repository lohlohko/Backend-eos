const Bquery = require('../modules/bquery')
const OAuth2Middleware = require('../helpers/middlewares/OAuthMiddlewares');
const asyncMiddleware = require('../helpers/utils/middlewareWrapper');

module.exports = (server) => {
  server.get('/codebase/v1/auth/token', asyncMiddleware(OAuth2Middleware.checkCredentials),Bquery.token);
  server.get('/codebase/v1/auth/project', asyncMiddleware(OAuth2Middleware.checkCredentials),Bquery.project);
  server.get('/:projectId/datasets', asyncMiddleware(OAuth2Middleware.checkCredentials),Bquery.datasets);
  server.get('/:projectId/datasets/:datasetId/tables', asyncMiddleware(OAuth2Middleware.checkCredentials),Bquery.table);
  server.get('/:projectId/datasets/:datasetId/tables/:tableId/schema', asyncMiddleware(OAuth2Middleware.checkCredentials),Bquery.schema);
  server.get('/:projectId/datasets/:datasetId/tables/:tableId/rows', asyncMiddleware(OAuth2Middleware.checkCredentials),Bquery.rows);
  server.get('/:projectId/datasets/:datasetId/tables/:tableId/query', asyncMiddleware(OAuth2Middleware.checkCredentials),Bquery.GetRowsByQuery);
};