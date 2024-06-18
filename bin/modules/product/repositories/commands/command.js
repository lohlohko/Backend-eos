const collection = 'product';
const { trace } = require('@opentelemetry/api');
class Command {

  constructor(db) {
    this.db = db;
  }

  async insertOne(document) {
    // const apmSpan = trace.getTracer('command').startSpan('insertOne');
    const result = await this.db.insertOne(document, collection);
    // return this.db.insertOne(document, collection);
    // apmSpan.end();
    return result;
  }

  async updateOne(parameter, document) {
    return this.db.updateOne(parameter, document, collection);
  }

  async insertRawQuery(rawQuery, values) {
    return this.db.insertRawQuery(rawQuery, values);
  }

  async updateRawQuery(rawQuery, values) {
    return this.db.updateRawQuery(rawQuery, values);
  }

}

module.exports = Command;
