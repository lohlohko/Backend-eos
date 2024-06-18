const { google } = require('googleapis');
const wrapper = require('./wrapper');
const logger = require('./logger');
const ctx = 'GoogleBigQuery';

class GoogleBigQuery {
  constructor(auth) {
    this.auth = auth;
  }

  async getFields({ projectId, datasetId, tableId, auth }) {
    const metadata = await google.bigquery({ version: 'v2', auth }).tables.get({
      projectId,
      datasetId,
      tableId,
    });
    // destructure the response so we can get the schema and return it
    const { data } = metadata;
    const { schema } = data;
    return schema;
  }

  async mapIndividualRowsRecord(rowsList, field) {
    const newRowsList = await Promise.all(
      rowsList.map(async (row) => {
        const { f: keyField } = row;
        return keyField;
      })
    );

    const rowsWithProperty = await Promise.all(
      newRowsList.map(async (row) => {
        const result = {};
        for (let rowsCounter = 0; rowsCounter < row.length; rowsCounter++) {
          result[`${field[rowsCounter].name}`] = row[rowsCounter].v; // Assuming 'v' property contains the actual value
        }
        return result;
      })
    );
    return rowsWithProperty;
  }

  async checkUserPermission(oAuth2Client, projectId) {
    const { data } = await google
      .cloudresourcemanager({ version: 'v1', auth: oAuth2Client })
      .projects.testIamPermissions({
        resource: projectId,
        permissions: ['bigquery.jobs.create'],
      });

    /*
    if data.permissions is not undefined, check if user has bigquery.jobs.create permission,
    otherwise return false
  */
    const isRequiredPermissionExist = data.permissions
      ? data.permissions.includes('bigquery.jobs.create')
      : false;
    return isRequiredPermissionExist;
  }
}

module.exports = GoogleBigQuery;