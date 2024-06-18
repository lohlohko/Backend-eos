const collection = 'companies';

class Command {

  constructor(db){
    this.db = db;
  }

  async insertOne(document){
    this.db.setCollection(collection);
    return this.db.insertOne(document);
  }

  async upsertOne(parameter, document) {
    this.db.setCollection(collection);
    return this.db.upsertOne(parameter, document);
  }
}

module.exports = Command;
