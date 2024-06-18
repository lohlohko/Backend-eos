const { google } = require('googleapis');

class Query {
  constructor(db) {
    this.db = db;
  }
  async getFields(projectId, datasetId, tableId, auth) {
    return this.db.getFields(projectId, datasetId, tableId, auth);
  }
  async mapIndividualRowsRecord(rowsList, field) {
    const result = await this.db.mapIndividualRowsRecord(rowsList, field);
    return result;
  }
  async checkUserPermission(oAuth2Client, projectId) {
    return this.db.checkUserPermission(oAuth2Client, projectId);
  }
}

module.exports = Query;

