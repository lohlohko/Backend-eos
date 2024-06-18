const logger = require('../../../../helpers/utils/logger');
const wrapper = require('../../../../helpers/utils/wrapper');
const { UnauthorizedError, NotFoundError, ConflictError, InternalServerError } = require('../../../../helpers/error');
const ctx = 'User-Command-Domain';
const Query = require('./query');
const { Collection } = require('mongodb');
const mudik = require('../../../../routes/mudik');
const collection = 'mudik';

class Mudik{

  constructor(db){
    this.query = new Query(db);
  }

  async listMudik() {
    
    const mudik = await this.query.findMany({},null,null,1,0,collection);
    if (mudik.err) {
      logger.error(ctx, mudik.err, 'can not find list mudik');
      return wrapper.error(new NotFoundError('can not find list mudik'))
    }
  
    return wrapper.data(mudik); 
  }

  async getMudikById (payload){
    console.log(payload)
    const mudik = await this.query.findOne({mudikId:payload.mudikId},{ _id:0,nama: 1,lokasi: 1}, collection);
    if(mudik.err) {
      logger.error(ctx, mudik.err, 'can not find data mudik');
      return wrapper.error(new InternalServerError ('can not find data mudik'))
    }
    return wrapper.data(mudik)
  }

  async getDataMudikById(payload) {
    console.log(payload)
    const mudik = await this.query.findById(payload.id,collection);
    if (mudik.err) {
      logger.error(ctx, mudik.err, 'can not find data mudik by id');
      return wrapper.error(new NotFoundError('can not find data mudik by id'))
    }
    return wrapper.data(mudik); 
  }
    

}

module.exports = Mudik;

