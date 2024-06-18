const users = require('./users');
const mudik = require('./mudik')
const chart = require('./chart');
const HitApiLlm = require('./HitApi_llm');
const bigquery = require('./bq')
module.exports = (server) => {
  users(server);
  mudik(server);
  chart(server);
  HitApiLlm(server);
  bigquery(server);

};