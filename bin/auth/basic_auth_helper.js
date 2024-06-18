const config = require('../infra/configs/global_config');
const wrapper = require('../helpers/utils/wrapper');
const { UnauthorizedError } = require('../helpers/error');
const validate = require('validate.js');
const queryAuth = require('../modules/auth/repositories/queries/query_handler');

const isAuthenticated = async (req, res) => {
  const result = { err: null, data: null };
  if (validate.isEmpty(req?.authorization?.basic)) {
    result.err = new UnauthorizedError();
    return wrapper.response(res, 'fail', result, 'Token is not valid!', 401);
  }
  const { username } = req.authorization.basic;
  const { password } = req.authorization.basic;
  const userDatas = config.get('/basicAuthApi');
  let authValid = false;
  userDatas.forEach((value) => {
    if (value.username === username && value.password === password){
      authValid = true;
    }
  });
  if (!authValid) {
    result.err = new UnauthorizedError();
    return wrapper.response(res, 'fail', result,'Token is not valid!', 401);
  }
};

const isExtAuthenticated = async (req, res) => {
  const result = { err: null, data: null };
  if (validate.isEmpty(req?.authorization?.basic)) {
    result.err = new UnauthorizedError();
    return wrapper.response(res, 'fail', result, 'Token is not valid!', 401);
  }
  const { username } = req.authorization.basic;
  const { password } = req.authorization.basic;
  const userData = await queryAuth.getAuth({ username, password });
  if (userData.err) {
    result.err = new UnauthorizedError();
    return wrapper.response(res, 'fail', result, 'Token is not valid!', 401);
  }
};

module.exports = {
  isAuthenticated,
  isExtAuthenticated,
};
