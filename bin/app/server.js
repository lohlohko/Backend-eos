const restify = require('restify');
const cors = require('./cors');
const sessionMiddleware = require('./session')
const gracfulShutdown = require('./graceful_shutdown');
const healtCheck = require('./health_check');
const project = require('../../package.json');
const basicAuth = require('../auth/basic_auth_helper');
const routes = require('../routes');
const config = require('../infra/configs/global_config');
const sampleHandler = require('../modules/sample/handlers/api_handler');
const productHandler = require('../modules/product/handlers/api_handler');
const mongoConnectionPooling = require('../helpers/databases/mongodb/connection');
const mongoConfig = config.get('/mongoDbUrl');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const postgreConnectionPooling = require('../helpers/databases/postgresql/connection');
// const pgConfig = config.get('/postgresqlUrl');

class AppServer {
  constructor() {
    this.server = restify.createServer({ name: `${project.name}-server`, version: project.version });
    gracfulShutdown.init(this.server);
    this.server.serverKey = '';
    this.server.use(restify.plugins.acceptParser(this.server.acceptable));
    this.server.use(restify.plugins.queryParser());
    this.server.use(restify.plugins.bodyParser());
    this.server.use(restify.plugins.authorizationParser());
    this.server.use(sessionMiddleware);
    this.server.use(cookieParser());
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: true}));

    // required for CORS configuration
    this.server.pre(cors.preflight);
    this.server.use(cors.actual);
   
    this.server.get('/codebase', (req, res, next) => {
      res.send(200, { success: true, data: 'server init', message: 'This service is running properly', code: 200 });
      next();
    });
    this.server.get('/codebase/health', (req, res, next) => {
      healtCheck.checkServiceHealth(this.server);
      res.send(200, { success: true, data: 'server init', message: 'This service is running health check', code: 200 });
      next();
    });

    // create sample
    this.server.post('/codebase/v1/sample', basicAuth.isAuthenticated, sampleHandler.postSample);
    // this.server.put('/codebase/v1/sample/:sampleId', basicAuth.isAuthenticated, sampleHandler.updateSample);
    // this.server.get('/codebase/v1/sample/:sampleId', basicAuth.isAuthenticated, sampleHandler.getSample);
    // this.server.get('/codebase/v1/sample', basicAuth.isAuthenticated, sampleHandler.listSample);
    // this.server.get('/codebase/v1/sample-count', basicAuth.isAuthenticated, sampleHandler.countSample);
    // this.server.del('/codebase/v1/sample/:sampleId', basicAuth.isAuthenticated, sampleHandler.deleteSample);

    // create product
    this.server.post('/codebase/v1/product', basicAuth.isAuthenticated, productHandler.postProduct);
    this.server.put('/codebase/v1/product/:productId', basicAuth.isAuthenticated, productHandler.updateProduct);

    routes(this.server);
    //Initiation
    mongoConnectionPooling.init(mongoConfig);
    // postgreConnectionPooling.init(pgConfig);
  }
}

module.exports = AppServer;
