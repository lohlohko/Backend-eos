const Query = require('./query');
const wrapper = require('../../../../helpers/utils/wrapper');
const logger = require('../../../../helpers/utils/logger');
const { NotFoundError } = require('../../../../helpers/error');
const ctx = 'Auth-Query-Domain';

class Auth {

  constructor(db) {
    this.query = new Query(db);
  }

  async viewAuth(payload) {
    const auth = await this.query.findOneProject(payload, {});
    if (auth.err) {
      logger.error(`${ctx}:viewUser`, 'Can not find auth', auth.err);
      return wrapper.error(new NotFoundError('Can not find auth'));
    }

    logger.info(`${ctx}:viewUser`, 'View auth.', payload.username);
    return wrapper.data(true);
  }

}

module.exports = Auth;
