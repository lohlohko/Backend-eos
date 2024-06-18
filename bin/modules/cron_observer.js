// cron_observer.js
// const config = require('../infra/configs/global_config');
const logger = require('../helpers/utils/logger');
// const apiHandler = require('./api_handler'); // Import your API handler module
const schedule = require('node-schedule');

const ctx = 'Cron-Observer';

const scheduleJobs = () => {
  // Schedule your cron jobs here
  schedule.scheduleJob('*/5 * * * * *', async () => {
    // Run API handler function every 5 minutes
    try {
    //   await apiHandler.yourFunctionToRun(); // Replace with the actual function to run
      logger.log(ctx, 'API handler function executed successfully.');
    } catch (error) {
      logger.error(ctx, 'Error executing API handler function:', error);
    }
  });

  // Add more cron jobs as needed
};

const init = () => {
  logger.log(ctx, 'Initiating cron observer...');
  process.on('unhandledRejection', (reason, p) => {
    p.catch(err => {
      logger.log(ctx, reason, err.stack);
    });
  });

  // Schedule jobs when initializing
  scheduleJobs();
};

module.exports = {
  init: init,
};
