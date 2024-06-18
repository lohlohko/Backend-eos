const Query = require('./query');
const CompanyQuery = require('../../../company/repositories/queries/query');
const wrapper = require('../../../../helpers/utils/wrapper');
const logger = require('../../../../helpers/utils/logger');
const { NotFoundError } = require('../../../../helpers/error');
const ctx = 'User-Query-Domain';

class User {

  constructor(db) {
    this.query = new Query(db);
    this.companyQuery = new CompanyQuery(db);
  }

  async viewUser(payload) {
    const user = await this.query.findOne(payload, { _id: 0, password: 0 });
    if (user.err) {
      logger.error(`${ctx}:viewUser`, 'Can not find user', user.err);
      return wrapper.error(new NotFoundError('Can not find user'));
    }
    logger.info(ctx, 'viewUser','get detail user', payload);
    return wrapper.data(user.data);
  }

}

module.exports = User;
