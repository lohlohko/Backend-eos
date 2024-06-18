const Command = require('./command');
const wrapper = require('../../../../helpers/utils/wrapper');
const { InternalServerError } = require('../../../../helpers/error');
const logger = require('../../../../helpers/utils/logger');

class Company {

  constructor(db) {
    this.ctx = 'Company-Command-Domain';
    this.command = new Command(db);
  }

  async createCompany(payload) {
    const { company } = payload;
    const commandInsert = await this.command.insertOne(company);
    if (commandInsert.err) {
      logger.error(`${this.ctx}:createCompany`, 'Can not create company.', commandInsert.err);
      return wrapper.error(new InternalServerError('Tidak dapat menambah perusahaan baru'));
    }

    logger.info(`${this.ctx}:createCompany`, 'Company created.', commandInsert.data.companyId);
    return wrapper.data(commandInsert.data);
  }

  async updateCompany(payload) {
    const { parameter, document } = payload;
    const command = await this.command.upsertOne(parameter, document);
    if (command.err) {
      logger.error(`${this.ctx}:createCompany`, 'Can not update company.', command.err);
      return wrapper.error(new InternalServerError('Tidak dapat mengubah data perusahaan'));
    }

    logger.info(`${this.ctx}:updateCompany`, 'Company created.', command.data.companyId);
    return wrapper.data(command.data);
  }

}

module.exports = Company;
