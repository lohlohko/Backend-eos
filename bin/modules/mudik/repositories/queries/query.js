const { ObjectId } = require('mongodb');
const collection = 'mudik';
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

  async findById(id){
    const document = {_id: new ObjectId(id)}
    const result = await this.db.findOne(document, {}, collection)
    return result;
  }
}

module.exports = Query;