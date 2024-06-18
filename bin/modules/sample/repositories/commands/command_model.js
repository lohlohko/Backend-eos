
const joi = require('joi');
const { v4: guid } = require('uuid');
const uuid = joi.string().guid();

const createSampleSchema = () => {
  const date = new Date();
  return joi.object({
    sampleId: joi.string().default(guid()),
    sampleName: joi.string().required(),
    sampleStatus: joi.bool().default(false),
    isActive: joi.boolean().default(false),
    isDeleted: joi.boolean().default(false),
    createdAt: joi.date().default(date),
    createdBy: joi.string().default('test'),
    modifiedAt: joi.date().default(date),
    modifiedBy: joi.string().default('test'),
  });
};

const updateSampleSchema = () => {
  const date = new Date();
  return joi.object({
    sampleId: uuid.required(),
    sampleName: joi.string().optional(),
    sampleStatus: joi.bool().optional(),
    isActive: joi.boolean().optional(),
    isDeleted: joi.boolean().optional(),
    modifiedAt: joi.string().default(date),
    modifiedBy: joi.string().default('test'),
  });
};

const deleteSampleSchema = () => {
  const date = new Date();
  return joi.object({
    sampleId: uuid.required(),
    isDeleted: joi.boolean().default(true),
    modifiedAt: joi.string().default(date),
    modifiedBy: joi.string().default('test'),
  });
};

module.exports = {
  createSampleSchema,
  updateSampleSchema,
  deleteSampleSchema,
};
