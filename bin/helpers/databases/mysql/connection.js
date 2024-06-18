const mysql = require('mysql2');
const logger = require('../../utils/logger');

let connectionPool = new Map();

const init = async (mysqlConfig) => {
  try {
    const poolKey = getPoolKey(mysqlConfig);
    const pool = mysql.createPool(mysqlConfig);
    // test connection
    pool.getConnection((error, connection) => {
      if (error) {
        logger.error('mysql connection', 'connection error', 'database initiation', error.stack);
        return;
      }
      logger.info('mysql connection', 'connected', 'database initiation');
      connection.release();
      connectionPool.set(poolKey, pool);
    });
  } catch (err) {
    logger.error('mysql connection', 'connection error', 'database initiation', err.stack);
  }
};

const getConnection = async (mysqlConfig) => {
  const poolKey = getPoolKey(mysqlConfig);
  if (!connectionPool.has(poolKey)) {
    await init(mysqlConfig);
  }
  return connectionPool.get(poolKey);
};

const getPoolKey = (mysqlConfig) => {
  return `${mysqlConfig.host}-${mysqlConfig.database}`;
};

module.exports = {
  init,
  getConnection
};
