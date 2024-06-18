const collection = 'user';
class Query {

  constructor(db) {
    this.db = db;
  }

  async findOne(parameter, projection) {
    return this.db.findOne(parameter, projection,collection);
  }
}

module.exports = Query;
