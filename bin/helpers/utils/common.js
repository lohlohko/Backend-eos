
const bcrypt = require('bcrypt');
const config = require('../../infra/configs/global_config');
const saltRounds = parseInt(config.get('/crypto/saltRounds'), 10);

const generateHash = (plain) => bcrypt.hash(plain, saltRounds);

const compareHash = (plain, hash) => bcrypt.compare(plain, hash);

module.exports = {
  generateHash,
  compareHash,
};
