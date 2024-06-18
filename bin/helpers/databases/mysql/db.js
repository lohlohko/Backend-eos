const mysql = require('mysql2');
const wrapper = require('../../utils/wrapper');
const logger = require('../../utils/logger');
const errorQueryMessage = 'Error querying MYSQL';
const errorEmptyMessage = 'Data Not Found Please Try Another Input';
const ctx = 'Database.MYSQL';
const mysqlConnection = require('./connection');

class DB {
  constructor(config) {
    this.config = config;
  }

  async executeQuery(query, values) {
    const pool = await mysqlConnection.getConnection(this.config);
    return new Promise((resolve, reject) => {
      pool.query(query, values, (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  }

  async findMany(parameter, projection, sort, page, limit, collectionName) {
    try {
      const projectionKeys = Object.keys(projection);
      const sortKeys = Object.keys(sort);
      const offset = limit * (page - 1);

      let query = 'SELECT ?? FROM ?? ';
      let values = [projectionKeys, collectionName];

      // construct where dynamically
      if (parameter && Object.keys(parameter).length != 0) {
        query += this.constructDynamicParameter(parameter);
        const parameterValues = Object.values(parameter);
        values = values.concat(parameterValues);
      }

      query += ' ORDER BY ' + mysql.escapeId(sortKeys);
      query += ' LIMIT ' + mysql.escape(limit);
      query += ' OFFSET ' + mysql.escape(offset);

      const result = await this.executeQuery(query, values);
      if (!result || result.length === 0) {
        return wrapper.error(errorEmptyMessage);
      }
      return wrapper.data(result);

    } catch (err) {
      logger.error(ctx, errorQueryMessage, 'findMany', err);
      return wrapper.error(errorQueryMessage);
    }
  }

  async findOne(parameter, projection, collectionName) {
    try {
      const projectionKeys = Object.keys(projection);
      let query = 'SELECT ?? FROM ?? ';
      let values = [projectionKeys, collectionName];

      // construct where dynamically
      if (parameter && Object.keys(parameter).length != 0) {
        query += this.constructDynamicParameter(parameter);
        const parameterValues = Object.values(parameter);
        values = values.concat(parameterValues);
      }

      query += ' LIMIT 1';

      const result = await this.executeQuery(query, values);
      if (!result || result.length === 0) {
        return wrapper.error(errorEmptyMessage);
      }
      return wrapper.data(result[0]);
    } catch (err) {
      logger.error(ctx, errorQueryMessage, 'findOne', err);
      return wrapper.error(errorQueryMessage);
    }
  }

  async countData(parameter, collectionName) {
    try {
      let query = 'SELECT COUNT(*) AS count FROM ??';
      let values = [collectionName];

      // construct where dynamically
      if (parameter && Object.keys(parameter).length != 0) {
        query += this.constructDynamicParameter(parameter);
        const parameterValues = Object.values(parameter);
        values = values.concat(parameterValues);
      }

      const result = await this.executeQuery(query, values);
      if (!result || result.length === 0) {
        return wrapper.error(errorEmptyMessage);
      }
      return wrapper.data(result[0]);
    } catch (err) {
      logger.error(ctx, errorQueryMessage, 'countData', err);
      return wrapper.error(errorQueryMessage);
    }
  }

  async insertOne(document, collectionName) {
    try {
      const query = 'INSERT INTO ?? SET ?';
      let values = [collectionName, document];
      const result = await this.executeQuery(query, values);
      if (!result) {
        return wrapper.error(errorQueryMessage);
      }
      return wrapper.data(result);
    } catch (err) {
      logger.error(ctx, errorQueryMessage, 'insertOne', err);
      return wrapper.error(errorQueryMessage);
    }
  }

  async updateOne(parameter, updateQuery, collectionName) {
    try {
      let query = 'UPDATE ?? SET ?';
      let values = [collectionName, updateQuery];

      query += this.constructDynamicParameter(parameter);
      const parameterValues = Object.values(parameter);
      values = values.concat(parameterValues);

      const result = await this.executeQuery(query, values);
      if (!result) {
        return wrapper.error(errorQueryMessage);
      }
      return wrapper.data(result);
    } catch (err) {
      logger.error(ctx, errorQueryMessage, 'updateOne', err);
      return wrapper.error(errorQueryMessage);
    }
  }

  async selectRawQuery(rawQuery, values) {
    try {
      const result = await this.executeQuery(rawQuery, values);
      if (!result || result.length === 0) {
        return wrapper.error(errorEmptyMessage);
      }
      return wrapper.data(result[0]);
    } catch (err) {
      logger.error(ctx, errorQueryMessage, 'selectRawQuery', err);
      return wrapper.error(errorQueryMessage);
    }
  }

  async insertRawQuery(rawQuery, values) {
    try {
      const result = await this.executeQuery(rawQuery, values);
      if (!result) {
        return wrapper.error(errorQueryMessage);
      }
      return wrapper.data(result);
    } catch (err) {
      logger.error(ctx, errorQueryMessage, 'insertRawQuery', err);
      return wrapper.error(errorQueryMessage);
    }
  }

  async updateRawQuery(rawQuery, values) {
    try {
      const result = await this.executeQuery(rawQuery, values);
      if (!result) {
        return wrapper.error(errorQueryMessage);
      }
      return wrapper.data(result);
    } catch (err) {
      logger.error(ctx, errorQueryMessage, 'updateOne', err);
      return wrapper.error(errorQueryMessage);
    }
  }

  constructDynamicParameter(parameter) {
    let query = ' WHERE ';
    const conditionKeys = Object.keys(parameter);
    query += conditionKeys.map((key) => `${key} = ?`).join(' AND ');
    return query;
  }

}

module.exports = DB;
