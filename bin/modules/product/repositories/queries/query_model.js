const joi = require('joi');
// const uuid = joi.string().guid();

const getProduct = joi.object().keys({
  productId: joi.string().required()
});

const listProduct = joi.object().keys({
  isDeleted: joi.bool().optional().default(false),
  page: joi.number().integer().default(1),
  limit: joi.number().integer().default(5)
});

module.exports = {
  getProduct,
  listProduct,
};
