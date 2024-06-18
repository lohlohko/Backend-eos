const config = require('../../../../infra/configs/global_config');
const DB = require('../../../../helpers/databases/mongodb/db');
const db = new DB(config.get('/mongoDbUrl'));
const Mudik = require('./domain');
const domain = new Mudik(db);

const listMudik = async () => {
    return domain.listMudik();
}
const getMudikById  = async (payload) => {
    return domain.getMudikById(payload);
}
const getDataMudikById = async (payload) => {
    return domain.getDataMudikById(payload);
}

module.exports = {
    listMudik,
    getMudikById,
    getDataMudikById,
}