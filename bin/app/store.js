const admin = require('firebase-admin');
const config = require('../infra/configs/global_config');
const serviceAccount = require('../../eos-project-420107-firebase-adminsdk-2yhp5-452c4a3252.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: config.get('/googleApi/project_id')
  });
}

const db = admin.firestore();

module.exports = { admin, db };
