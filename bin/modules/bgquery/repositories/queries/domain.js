const { OAuth2Client } = require('google-auth-library');
const { google } = require('googleapis');
const config = require('../../../../infra/configs/global_config');
const Query = require('./query');

const CLIENT_ID = config.get('/googleApi/client_id');
const CLIENT_SECRET = config.get('/googleApi/client_secret');
const REDIRECT_URL = config.get('/googleApi/redirect_uri');
// Membuat instance OAuth2Client
const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
console.log(oAuth2Client);
// Membuat instance GoogleBigQuery dengan autentikasi OAuth2Client

class Bigquery {
  constructor() {
    this.query = new Query(oAuth2Client);
  }

  async getFields(projectId, datasetId, tableId) {
    const result = await this.query.getFields({
      projectId,
      datasetId,
      tableId,
    });
    console.log('Field:', result);
  }

  // Contoh penggunaan mapIndividualRowsRecord
  async mapIndividualRowsRecord() {
    const rowsList = [
      { f: [{ v: 'value1' }, { v: 'value2' }] },
      { f: [{ v: 'value3' }, { v: 'value4' }] },
    ];
    const fields = [{ name: 'column1' }, { name: 'column2' }];
    const result = await this.query.mapIndividualRowsRecord(rowsList, fields);
    console.log(result);
  }

  // Contoh penggunaan checkUserPermission
  async checkUserPermission() {
    const result = await this.query.checkUserPermission(config.PROJECT_ID);
    console.log(result);
  }
}

module.exports = Bigquery;

