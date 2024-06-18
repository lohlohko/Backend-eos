const corsMiddleware = require('restify-cors-middleware2');
const config = require('../infra/configs/global_config');

const origins = String(config.get('/cors/origins')).split(',');
const allowHeaders = String(config.get('/cors/allowHeaders')).split(',');
const exposeHeaders = String(config.get('/cors/exposeHeaders')).split(',');
const preflightMaxAge = parseInt(config.get('/cors/preflightMaxAge'), 10);

const cors = corsMiddleware({ origins, allowHeaders, exposeHeaders, preflightMaxAge });

module.exports = cors;
