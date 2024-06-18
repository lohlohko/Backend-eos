const { v4: uuid } = require('uuid');
const Query = require('../queries/query');
const Command = require('./command');
const wrapper = require('../../../../helpers/utils/wrapper');
const jwtAuth = require('../../../../auth/jwt_auth_helper');
const commonUtil = require('../../../../helpers/utils/common');
const logger = require('../../../../helpers/utils/logger');
const {
  UnauthorizedError,
  NotFoundError,
  ConflictError,
  InternalServerError,
} = require('../../../../helpers/error');
const ctx = 'User-Command-Domain';

class User {
  constructor(db) {
    this.command = new Command(db);
    this.query = new Query(db);
  }

  async login(payload) {
    const { username, password } = payload;
    const user = await this.query.findOne({ username }, { _id: 0 });
    if (user.err) {
      logger.log(`${ctx}:generateCredential`, user.err, 'user not found');
      return wrapper.error(new NotFoundError('user not found'));
    }
    const passwordMatch = await commonUtil.compareHash(
      password,
      user.data.password
    );
    if (username !== user.data.username || !passwordMatch) {
      return wrapper.error(new UnauthorizedError('Password invalid!'));
    }
    delete user.data.password;
    const token = await jwtAuth.generateToken(user.data);
    return wrapper.data(token);
  }

  async register(payload) {
    const { username, password, isActive } = payload;
    const user = await this.query.findOne({ username },{ _id: 0 });
    if (user.data) {
      return wrapper.error(new ConflictError('user already exist'));
    }
    const hashed = await commonUtil.generateHash(password);
    const data = {
      userId: uuid(),
      username,
      password: hashed,
      created_at: new Date().toISOString(),
      isActive,
    };
    const result = await this.command.insertOne(data);
    console.log(payload);
    if (result.err) {
      logger.error(ctx, 'register', 'can not insert to database', result.err);
      return wrapper.error(
        new InternalServerError('can not insert to database')
      );
    }
    delete data.password;
    return wrapper.data(data);
  }
}
module.exports = User;
