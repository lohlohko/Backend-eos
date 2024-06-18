const config = require('../../../../infra/configs/global_config');
const DB = require('../../../../helpers/databases/mongodb/db');
const db = new DB(config.get('/mongoDbUrl'));
const Mudik = require('./domain');
const mudik = new Mudik(db);

const postMudik = async (payload) => {
    const postCommand= async payload => mudik.create(payload);
    return postCommand(payload);
}

const updateMudik = async (payload) => {
    const updateMudik= async payload => mudik.update(payload);
    return updateMudik(payload);
}

const deleteMudik = async (payload) => {
    const deleteMudik= async payload => mudik.delete(payload);
    return deleteMudik(payload);
}

module.exports = {
    postMudik,
    updateMudik,
    deleteMudik,
}