const joi = require('joi');
const { v4: guid } = require('uuid');

const listAllMudik = joi.object({
    mudikId: joi.string().optional(),
    nama: joi.string().optional(),
    lokasi: joi.string().optional()
});

const getDataMudik = joi.object().keys({
    mudikId: joi.string().optional(),

});

const getDataMudikById = joi.object().keys({
    id: joi.string().default(guid()),
});

module.exports = {
    listAllMudik,
    getDataMudik,
    getDataMudikById,
}
