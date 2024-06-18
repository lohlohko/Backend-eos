const configs = require('./bin/infra/configs/global_config');
// const apm = require('./bin/helpers/components/monitoring/observability');
// apm.init();
const apm_span = require('./bin/helpers/utils/apm_span');
apm_span.init();

const logger = require('./bin/helpers/utils/logger');
const AppServer = require('./bin/app/server');
const appServer = new AppServer();
// const observer = require('./bin/modules/observer');
// const cronObserver = require('./bin/modules/cron_observer');
const port = process.env.port || configs.get('/port') || 9000;
const ctx = 'App-Server';

appServer.server.listen(port, () => {
  logger.enableLogging(); //run log service
  // observer.init(); //run ev-ent observer
  // cronObserver.init(); //run cron observer
  logger.log(ctx, 'node start at index.js', `${appServer.server.name} started, listening at ${port}`);
});
