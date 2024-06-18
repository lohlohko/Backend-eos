const joi = require('joi');
// const uuid = joi.string().guid();

const getSample = joi.object().keys({
  sampleId: joi.string().required()
});

const listSample = joi.object().keys({
  isDeleted: joi.bool().optional().default(false),
  page: joi.number().integer().default(1),
  limit: joi.number().integer().default(5)
});

module.exports = {
  getSample,
  listSample,
};
