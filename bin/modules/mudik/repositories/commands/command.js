const collection = 'mudik';
class Command {

  constructor(db) {
    this.db = db;
  }

  async insertOne(document) {
    const result = await this.db.insertOne(document, collection);
    return result;
  }

  async updateOne(parameter, document){
    return this.db.updateOne(parameter, document, collection)
  }

  async deleteOne(parameter){
    return this.db.deleteOne(parameter, collection)
  }

}

module.exports = Command;