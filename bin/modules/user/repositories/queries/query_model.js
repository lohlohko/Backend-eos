const joi = require('joi');

const getUser = joi.object({
  userId: joi.string().optional(),
  username: joi.string().optional(),
});

module.exports = {
  getUser,
};
