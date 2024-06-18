const joi = require('joi');

const heatMap = joi.object({
  name: joi.string().optional(),
  data: joi.array().optional(),
});

module.exports = {
  heatMap,
}