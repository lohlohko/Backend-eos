const collection = 'barChart';

class Query {
  constructor(db) {
    this.db = db;
  }
  async findMany(parameter, projection, sort, skip, page, limit) {
    const result = await this.db.findMany(parameter, projection, sort, skip, page, limit, collection);
    return result;
  }
  async findOne(parameter, projection) {
    const result = await this.db.findOne(parameter, projection, collection);
    return result;
  }
}
module.exports = Query;



