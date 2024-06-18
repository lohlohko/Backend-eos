const joi = require('joi');

const login = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
});

const register = joi.object({
  username: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
  password: joi.string().required(),
  isActive: joi.bool().default(true).forbidden()
});

module.exports = {
  login,
  register,
};
