const config = require('../../../infra/configs/global_config');
const monitoring = config.get('/monitoring');
const path = `../${config.get('/monitoring')}/apm`;
const constraint = ['dd-trace', 'es-apm', 'opentelemetry'];
const validConstraint = constraint.includes(monitoring);

module.exports = validConstraint ? require(path) : { init: () => false };
