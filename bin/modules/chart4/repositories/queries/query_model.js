const joi = require('joi');

const stackedbar = joi.object({
  category: joi.string().optional(),
  netProfit: joi.number().optional(),
  revenue: joi.number().optional(),
  freeCashFlow: joi.number().optional(),
});

const groupedbar = joi.object({
  category: joi.string().optional(),
  netProfit: joi.number().optional(),
  revenue: joi.number().optional(),
  freeCashFlow: joi.number().optional(),
});
module.exports = {
  stackedbar,
  groupedbar,
}