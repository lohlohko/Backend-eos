const OAuthMiddleware = require('../../../auth/oauth2_helper');
const authMiddleware = new OAuthMiddleware();
const oAuth2Client = authMiddleware.oAuth2Client;
const wrapper = require('../../../helpers/utils/wrapper');
const { ERROR } = require('../../../helpers/http-status/status_code');
const { ForbiddenError } = require('../../../helpers/error');
const { google } = require('googleapis');
const { getFields, mapIndividualRowsRecord} = require('../../../helpers/utils/bqhelper') 

//================= Schema get Token ==========================
const token = async (req, res) => {
  const result = { err: null, data: null };
  try {
    if(!req.session.access_token){
      throw new ForbiddenError('Your Session has expired. Please login first');
    }

    oAuth2Client.setCredentials({
      access_token: req.session.access_token,
      refresh_token: req.session.refresh_token,
      expiry_date: req.session.expiry_time
    });

    const accessToken = oAuth2Client.credentials.access_token;

    res.send({
      status: 'success',
      data: {
        token: {
          access_token: accessToken,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching token:', error);
    result.err = new ForbiddenError('Invalid get accesToken!');
    return wrapper.response(res, 'fail', result, 'Invalid get accesToken!', ERROR.FORBIDDEN);
  }
};

//================= Schema get Project ==========================
const project = async (req, res) => {
  const result = { err: null, data: null };
  try {
    if(!req.session.access_token){
      throw new ForbiddenError('Your Session has expired. Please login first');
    }

    oAuth2Client.setCredentials({
      access_token: req.session.access_token,
      refresh_token: req.session.refresh_token,
      expiry_date: req.session.expiry_time
    });

    const accessToken = oAuth2Client.credentials.access_token;

    const userProject = await fetch('https://cloudresourcemanager.googleapis.com/v1/projects', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const dataProject = await userProject.json();
    const { projects } = dataProject;

    if (!projects || projects.length === 0) throw new ForbiddenError('User Project Not Found');


    res.send({
      status: 'success',
      data: {
        Project: {
          name: projects,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching token:', error);
    result.err = new ForbiddenError('Invalid get accesToken!');
    return wrapper.response(res, 'fail', result, 'Invalid get accesToken!', ERROR.FORBIDDEN);
  }
};

//================= Schema get dataset ==========================
const datasets = async (req, res) => {
  const result = { err: null, data: null };
  const { projectId } = req.params;
  try {
    if(!req.session.access_token){
      throw new ForbiddenError('Your Session has expired. Please login first');
    }

    oAuth2Client.setCredentials({
      access_token: req.session.access_token,
      refresh_token: req.session.refresh_token,
      expiry_date: req.session.expiry_time
    });

    const { data } = await google.bigquery({ version: 'v2', auth: oAuth2Client }).datasets.list({ projectId });
    const { datasets } = data;

    if (!datasets || datasets.length === 0) throw new ForbiddenError('Datasets Not Found');

    res.send({
      status: 'success',
      data: {
        DataSet: datasets,
      },
    });
  } catch (error) {
    console.error('Error fetching token:', error);
    result.err = new ForbiddenError('Invalid get accesToken!');
    return wrapper.response(res, 'fail', result, 'Invalid get accesToken!', ERROR.FORBIDDEN);
  }
};

//================= Schema get table ==========================
const table = async (req, res) => {
  const result = { err: null, data: null };
  const { projectId, datasetId} = req.params;
  try {
    if(!req.session.access_token){
      throw new ForbiddenError('Your Session has expired. Please login first');
    }

    oAuth2Client.setCredentials({
      access_token: req.session.access_token,
      refresh_token: req.session.refresh_token,
      expiry_date: req.session.expiry_time
    });


    const { data } = await google.bigquery({ version: 'v2', auth: oAuth2Client }).tables.list({ 
      projectId,
      datasetId,
    });
    const { tables: tablesList } = data;
    if (!tablesList || tablesList.length === 0) throw new ForbiddenError('Tables Not Found');

    // Map tables to an array of promises
    const fixtable = await Promise.all(
      tablesList.map(async (table) => {
        // get projectId, datasetId, tableId from each table to get its metadata
        const { tableReference } = table;
        const { projectId, datasetId, tableId } = tableReference;
        let metadata = null;
        try {
          // get metadata of each table
          metadata = await google.bigquery({ version: 'v2', auth: oAuth2Client }).tables.get({
            projectId,
            datasetId,
            tableId,
          });
        } catch (error) {
          console.error('Error fetching token:', error);
          result.err = new ForbiddenError('Invalid get each table!');
          return wrapper.response(res, 'fail', result, 'Invalid get each table!', ERROR.FORBIDDEN);
        }
  
        // destructure the response
        const { data } = metadata;
        const { description, schema } = data;
        const {
          id, kind, timePartitioning, labels, creationTime, ...newTable
        } = table;
  
        // set newTable properties
        newTable.description = description || 'No description';
        newTable.schema = schema.fields;
        newTable.numRows = data.numRows;
  
        return newTable;
      }),
    );

    res.send({
      status: 'success',
      data: {
        Tables: fixtable,
      },
    });

  } catch (error) {
    console.error('Error fetching token:', error);
    result.err = new ForbiddenError('Invalid get accesToken!');
    return wrapper.response(res, 'fail', result, 'Invalid get accesToken!', ERROR.FORBIDDEN);
  }
};
//================= get table schema ==========================
const schema = async (req, res) => {
  const result = { err: null, data: null };
  const { projectId, datasetId, tableId } = req.params;
  try {
    if(!req.session.access_token){
      throw new ForbiddenError('Your Session has expired. Please login first');
    }

    oAuth2Client.setCredentials({
      access_token: req.session.access_token,
      refresh_token: req.session.refresh_token,
      expiry_date: req.session.expiry_time
    });

    const { fields } = await getFields({
      projectId, 
      datasetId, 
      tableId, 
      auth: oAuth2Client
    })

    res.send({
      status: 'success',
      data: {
        Schema: fields,
      },
    });
  } catch (error) {
    console.error('Error fetching token:', error);
    result.err = new ForbiddenError('Invalid get accesToken!');
    return wrapper.response(res, 'fail', result, 'Invalid get accesToken!', ERROR.FORBIDDEN);
  }
};

//================= get table row ==========================
const rows = async (req, res) => {
  const result = { err: null, data: null };
  const { projectId, datasetId, tableId } = req.params;
  try {
    if(!req.session.access_token){
      throw new ForbiddenError('Your Session has expired. Please login first');
    }

    oAuth2Client.setCredentials({
      access_token: req.session.access_token,
      refresh_token: req.session.refresh_token,
      expiry_date: req.session.expiry_time
    });

    const { data } = await google.bigquery({ version: 'v2', auth: oAuth2Client }).tabledata.list({
      projectId, datasetId, tableId, maxResults: 5,
    });

    if (!data.rows) throw new ForbiddenError('Records Not Found');

    const { rows: rowlist } = data;

    const { fields } = await getFields({
      projectId, 
      datasetId, 
      tableId, 
      auth: oAuth2Client
    })

    const RowsWithField = await mapIndividualRowsRecord(rowlist, fields);

    res.send({
      status: 'success',
      data: {
        Rows: RowsWithField,
      },
    });
  } catch (error) {
    console.error('Error fetching token:', error);
    result.err = new ForbiddenError('Invalid get accesToken!');
    return wrapper.response(res, 'fail', result, 'Invalid get accesToken!', ERROR.FORBIDDEN);
  }
};

module.exports = {
  token,
  project,
  datasets,
  table,
  schema,
  rows,

}