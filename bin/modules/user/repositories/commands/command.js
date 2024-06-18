const collection = 'user'
class Command {

  constructor(db) {
    this.db = db;
  }

  async insertOne(document){
    const result = await this.db.insertOne(document,collection);
    return result;
  }

  async upsertOne(param, document){
    const result = await this.db.upsertOne(param, document,collection);
    return result;
  }

}

module.exports = Command;
