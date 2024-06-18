class Query {

  constructor(db) {
    this.db = db;
  }

  async findOneProject(parameter, project) {
    this.db.setCollection('companies');
    const recordset = await this.db.findOneProject(parameter, project);
    return recordset;
  }

  async aggregate(parameter){
    this.db.setCollection('companies');
    const recordset = await this.db.aggregate(parameter);
    return recordset;
  }

  async distinct(field, parameter){
    this.db.setCollection('companies');
    const recordset = await this.db.distinct(field, parameter);
    return recordset;
  }

}

module.exports = Query;
