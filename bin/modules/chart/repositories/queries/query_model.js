const joi = require('joi');

const barChart = joi.object({
  category: joi.string().optional(),
  series0: joi.number().optional(),
});

const pieChart = joi.object({
  category: joi.string().optional(),
  series0: joi.number().optional(),
});

const LineChart = joi.object({
  category: joi.string().optional(),
  series0: joi.number().optional(),
});

const Heatmap = joi.object({
  name: joi.string().optional(),
  data: joi.array().optional(),
});

module.exports = {
  barChart,
  pieChart,
  LineChart,
  Heatmap,
}