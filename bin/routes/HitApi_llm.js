const apiService = require('../modules/testHitApi_llm');

module.exports = (server) => {
  server.post('/v1/generate-text-to-sql', apiService.generateTextToSQL);
  server.post('/v1/interpret-data', apiService.interpretData);
  server.post('/v1/resolve-sql-error', apiService.resolveSQLError);
};

