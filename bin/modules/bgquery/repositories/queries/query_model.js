const joi = require('joi');
const { v4: guid } = require('uuid');
const uuid = joi.string().guid();

// Schema for validate insight payload
const insightPayloadSchema = joi.object().keys({
  projectId: joi.string().optional(),
  datasetId: joi.string().optional(),
  tableId: joi.string().optional(),
});

module.exports = {
  insightPayloadSchema,
};

