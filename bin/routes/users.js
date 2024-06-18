const basicAuth = require('../auth/basic_auth_helper');
const jwtAuth = require('../auth/jwt_auth_helper');
const userHandler = require('../modules/user/handlers/api_handler');
const OAuth2Helper = require('../auth/oauth2_helper');
const OAuth2 = new OAuth2Helper();
const OAuth2Middleware = require('../helpers/middlewares/OAuthMiddlewares');
const asyncMiddleware = require('../helpers/utils/middlewareWrapper');

module.exports = (server) => {
  server.post('/codebase/v1/user', basicAuth.isAuthenticated, userHandler.register);
  server.post('/codebase/v1/login', basicAuth.isAuthenticated, userHandler.login);
  server.get('/codebase/v1/user', jwtAuth.verifyToken, userHandler.getUser);
  server.get('/codebase/v1/auth', asyncMiddleware(OAuth2.login));
  server.get('/auth/google/callback', asyncMiddleware(OAuth2.callback));
  server.get('/codebase/v1/auth/user', asyncMiddleware(OAuth2Middleware.checkCredentials), OAuth2.userInfo);
  server.post('/codebase/v1/auth/logout',asyncMiddleware(OAuth2Middleware.deleteSession), OAuth2.logout);
  
};
