const joi = require('joi');
const { v4: guid } = require('uuid');
const uuid = joi.string().guid();
const date = new Date();

const createMudikSchema = joi.object ({
    mudikId: joi.string().default(guid(uuid)),
    nama: joi.string().required(),
    lokasi: joi.string().required(),
    createdAt: joi.date().default(date),
    createdBy: joi.string().default('user'),
    modifiedAt: joi.date().default(date),
    modifiedBy: joi.string().default('user')
    
});

const updateMudikSchema = joi.object ({
    mudikId: joi.string().optional(guid()),
    nama: joi.string().optional(),
    lokasi: joi.string().optional(),
    createdAt: joi.date().default(date),
    createdBy: joi.string().default('user'),
    modifiedAt: joi.date().default(date),
    modifiedBy: joi.string().default('user')
    
});

const deleteMudikSchema = joi.object ({
    mudikId: joi.string().optional(guid()),
    nama: joi.string().optional(),
    lokasi: joi.string().optional(),
    createdAt: joi.date().default(date),
    createdBy: joi.string().default('user'),
    modifiedAt: joi.date().default(date),
    modifiedBy: joi.string().default('user')
    
});


module.exports = {
    createMudikSchema,
    updateMudikSchema,
    deleteMudikSchema,

};