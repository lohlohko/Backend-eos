
const pgConnection = require('./connection');
const wrapper = require('../../utils/wrapper');
const logger = require('../../utils/logger');
const errorQueryMessage = 'Error querying PostgreSQL';
const errorEmptyMessage = 'Data Not Found Please Try Another Input';
const ctx = 'Database.PostgreSQL';

class DB {

  constructor(pgConfig) {
    this.pgConfig = pgConfig;
  }

  async executeQuery(query, values) {
    try {
      const getDatabase = await pgConnection.getConnection(this.pgConfig);
      const result = await getDatabase.query(query, values);
      return result;
    } catch (err) {
      logger.error(ctx, errorQueryMessage, 'executeQuery', err);
      return null;
    }
  }

  async findOne(parameter, projection, collectionName) {
    try {
      const projectionKeys = Object.keys(projection);
      const parameterKey = Object.keys(parameter);
      const projectionPlaceholders = projectionKeys.map(key => `${collectionName}."${key}"`).join(', ');
      const parameterPlaceholders = parameterKey.map((key, index) => `${collectionName}."${key}" = $${index+1}`).join(' AND ');
      const query = `
        SELECT ${projectionPlaceholders}
        FROM ${collectionName}
        WHERE ${parameterPlaceholders}
        LIMIT 1;
      `;
      const values = parameterKey.map(key => parameter[key]);
      const result = await this.executeQuery(query, values);
      if (!result || result.rows.length === 0) {
        return wrapper.error(errorEmptyMessage);
      }
      return wrapper.data(result.rows[0]);
    } catch (err) {
      logger.error(ctx, errorQueryMessage, 'findOne', err);
      return wrapper.error(errorQueryMessage);
    }
  }

  async insertOne(document, collectionName) {
    try {
      const keys = Object.keys(document);
      const values = Object.values(document);
      const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
      const projectionPlaceholders = keys.map(key => `"${key}"`).join(', ');
      const query = `
        INSERT INTO ${collectionName} (${projectionPlaceholders})
        VALUES (${placeholders})
        RETURNING *;
      `;
      const result = await this.executeQuery(query, values);
      if (!result || result.rows.length === 0) {
        return wrapper.error(errorQueryMessage);
      }
      return wrapper.data(result.rows[0]);
    } catch (err) {
      logger.error(ctx, errorQueryMessage, 'insertOne', err);
      return wrapper.error(errorQueryMessage);
    }
  }

  async updateOne(parameter, updateQuery, collectionName) {
    try {
      let index = 1;
      const updateQueryKey = Object.keys(updateQuery);
      const parameterKey = Object.keys(parameter);
      const updateQueryKeyPlaceholders = updateQueryKey.map((key) => `"${key}" = $${index++}`).join(', ');
      const parameterPlaceholders = parameterKey.map((key) => `"${key}" = $${index++}`).join(' AND ');
      const query = `
        UPDATE ${collectionName}
        SET ${updateQueryKeyPlaceholders}
        WHERE ${parameterPlaceholders}
        RETURNING *;
      `;

      let values = [];
      const updateQueryValues = Object.values(updateQuery);
      const parameterValues = Object.values(parameter);
      values = values.concat(updateQueryValues, parameterValues);

      const result = await this.executeQuery(query, values);
      if (!result || result.rows.length === 0) {
        return wrapper.error(errorEmptyMessage);
      }
      return wrapper.data(result.rows[0]);
    } catch (err) {
      logger.error(ctx, errorQueryMessage, 'updateOne', err);
      return wrapper.error(errorQueryMessage);
    }
  }

  async countData(parameter, collectionName) {
    try {
      const parameterKey = Object.keys(parameter);
      const parameterPlaceholders = parameterKey.map((key, index) => `${collectionName}."${key}" = $${index+1}`).join(' AND ');
      const query = `
        SELECT COUNT(*)
        FROM ${collectionName}
        WHERE ${parameterPlaceholders};
      `;
      const values = parameterKey.map(key => parameter[key]);
      const result = await this.executeQuery(query, values);
      if (!result || result.rows.length === 0) {
        return wrapper.error(errorEmptyMessage);
      }
      return wrapper.data(result.rows[0].count);
    } catch (err) {
      logger.error(ctx, errorQueryMessage, 'countData', err);
      return wrapper.error(errorQueryMessage);
    }
  }

  async findMany(parameter, projection, sort, page, limit, collectionName) {
    try {
      const projectionKeys = Object.keys(projection);
      const parameterKey = Object.keys(parameter);
      const projectionPlaceholders = projectionKeys.map(key => `${collectionName}."${key}"`).join(', ');
      const sortingPlaceholders = Object.keys(sort).map(key => `${collectionName}."${key}"`).join(', ');
      const parameterPlaceholders = parameterKey.map((key, index) => `${collectionName}."${key}" = $${index+1}`).join(' AND ');
      const offset = limit * (page - 1);
      const query = `
        SELECT ${projectionPlaceholders}
        FROM ${collectionName}
        WHERE ${parameterPlaceholders}
        ORDER BY ${sortingPlaceholders} 
        LIMIT ${limit} OFFSET ${offset};
      `;
      const values = parameterKey.map(key => parameter[key]);
      const result = await this.executeQuery(query, values);
      if (!result || result.rows.length === 0) {
        return wrapper.error(errorEmptyMessage);
      }
      return wrapper.data(result.rows);
    } catch (err) {
      logger.error(ctx, errorQueryMessage, 'findMany', err);
      return wrapper.error(errorQueryMessage);
    }
  }

  async selectRawQuery(rawQuery, values) {
    try {
      const result = await this.executeQuery(rawQuery, values);
      if (!result || result.rows.length === 0) {
        return wrapper.error(errorEmptyMessage);
      }
      return wrapper.data(result.rows[0]);
    } catch (err) {
      logger.error(ctx, errorQueryMessage, 'selectRawQuery', err);
      return wrapper.error(errorQueryMessage);
    }
  }

  async insertRawQuery(rawQuery, values) {
    try {
      const result = await this.executeQuery(rawQuery, values);
      if (!result || result.rows.length === 0) {
        return wrapper.error(errorQueryMessage);
      }
      return wrapper.data(result.rows[0]);
    } catch (err) {
      logger.error(ctx, errorQueryMessage, 'insertRawQuery', err);
      return wrapper.error(errorQueryMessage);
    }
  }

  async updateRawQuery(rawQuery, values) {
    try {
      const result = await this.executeQuery(rawQuery, values);
      if (!result || result.rows.length === 0) {
        return wrapper.error(errorEmptyMessage);
      }
      return wrapper.data(result.rows[0]);
    } catch (err) {
      logger.error(ctx, errorQueryMessage, 'updateRawQuery', err);
      return wrapper.error(errorQueryMessage);
    }
  }

}

module.exports = DB;
