
const { Pool } = require('pg');
const logger = require('../../utils/logger');

let connectionPool = new Map();

const init = async (pgConfig) => {
  const poolKey = JSON.stringify(pgConfig);
  if (!connectionPool.has(poolKey)) {
    try {
      const pool = new Pool({ connectionString: pgConfig });
      const client = await pool.connect();
      logger.info('postgresql connection', 'connected', 'database initiation');
      connectionPool.set(poolKey, pool);
      client.release();
    } catch (err) {
      logger.error('postgresql connection', 'connection error', 'database initiation', err.stack);
    }
  }
};

const getConnection = async (pgConfig) => {
  const poolKey = JSON.stringify(pgConfig);
  if (!connectionPool.has(poolKey)) {
    await init(pgConfig);
  }
  return connectionPool.get(poolKey);
};

module.exports = {
  init,
  getConnection
};
