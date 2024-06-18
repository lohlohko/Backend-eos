const collection = 'sample-listeners';
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
}

module.exports = Command;
