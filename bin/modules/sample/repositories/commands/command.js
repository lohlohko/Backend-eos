const collection = 'sample';
class Command {

  constructor(db) {
    this.db = db;
  }

  async insertOne(document) {
    return this.db.insertOne(document, collection);
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
