const logger = require('../../../../helpers/utils/logger');
const wrapper = require('../../../../helpers/utils/wrapper');
const { UnauthorizedError, NotFoundError, ConflictError, InternalServerError } = require('../../../../helpers/error');
const ctx = 'User-Command-Domain';
const Command = require('../commands/command')

class Mudik {

  constructor(db){
    this.command = new Command(db);
    //this.query = new Query(db);
  }

  async create(payload) {
    const { mudikId, nama, lokasi,createdAt,createdBy,modifiedAt, modifiedBy} = payload;
    const mudik = {
      mudikId,
      nama,
      lokasi,
      createdAt,
      createdBy,
      modifiedAt,
      modifiedBy

    }
    const result = await this.command.insertOne(mudik);
    if (result.err) {
      logger.error(ctx, 'create', 'can not create data to database', result.err);
      return wrapper.error(new InternalServerError('can not insert to database'))
    }
    return wrapper.data(result);
  }

  async update(payload) {
    const { mudikId, nama, lokasi,createdAt,createdBy,modifiedAt, modifiedBy} = payload;
    const params = { mudikId: mudikId };
    const mudik = {
      nama,
      lokasi,
      createdAt,
      createdBy,
      modifiedAt,
      modifiedBy
    }
    const result = await this.command.updateOne(params,mudik);
    if (result.err) {
      logger.error(ctx, 'update', 'can not update data', result.err);
      return wrapper.error(new InternalServerError('can not update data'))
    }
    return wrapper.data(result);
  }

  async delete(payload) {
    const { mudikId, nama, lokasi,createdAt,createdBy,modifiedAt, modifiedBy} = payload;
    const params = { mudikId: mudikId };
    const mudik = {
      nama,
      lokasi,
      createdAt,
      createdBy,
      modifiedAt,
      modifiedBy
    }
    const result = await this.command.deleteOne(params,mudik);
    if (result.err) {
      logger.error(ctx, 'delete', 'can not delete data', result.err);
      return wrapper.error(new InternalServerError('can not delete data'))
    }
    return wrapper.data(result);
  }

}

module.exports = Mudik;