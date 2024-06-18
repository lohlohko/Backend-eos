class Query {

  constructor(db) {
    this.db = db;
  }

  async findOneProject(param, projection) {
    this.db.setCollection('auth');
    return this.db.findOneProject(param, projection);
  }
}

module.exports = Query;
