const joi = require('joi');

const Scatter = joi.object({
  category: joi.string().optional(),
  TeamA: joi.number().optional(),
  TeamB: joi.number().optional(),
  TeamC: joi.number().optional(),
})

const Treemap = joi.object({
  category: joi.string().optional(),
  TeamA: joi.number().optional(),
})

module.exports = {
  Scatter,
  Treemap,
}