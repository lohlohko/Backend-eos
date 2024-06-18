
const joi = require('joi');
const { v4: guid } = require('uuid');
const uuid = joi.string().guid();

const createProductSchema = () => {
  const date = new Date();
  return joi.object({
    productId: joi.string().default(guid()),
    productName: joi.string().required(),
    productStatus: joi.bool().default(false),
    isActive: joi.boolean().default(false),
    isDeleted: joi.boolean().default(false),
    createdAt: joi.date().default(date),
    createdBy: joi.string().default('test'),
    modifiedAt: joi.date().default(date),
    modifiedBy: joi.string().default('test'),
  });
};

const updateProductSchema = () => {
  const date = new Date();
  return joi.object({
    productId: uuid.required(),
    productName: joi.string().optional(),
    productStatus: joi.bool().optional(),
    productImage: joi.object().optional(),
    isActive: joi.boolean().optional(),
    isDeleted: joi.boolean().optional(),
    modifiedAt: joi.string().default(date),
    modifiedBy: joi.string().default('test'),
  });
};

const deleteProductSchema = () => {
  const date = new Date();
  return joi.object({
    productId: uuid.required(),
    isDeleted: joi.boolean().default(true),
    modifiedAt: joi.string().default(date),
    modifiedBy: joi.string().default('test'),
  });
};

module.exports = {
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
};
