const { GetTable } = require('../modules/bgquery/handlers/api_handler');
const queryModel = require('../repositories/queries/query_model');
const validator = require('../../../helpers/utils/validator');
const { sendResponse } = require('../../../helpers/utils/response');
const { AuthorizationError } = require('../../../helpers/error');
const { checkUserPermission } = require('../../../helpers/utils/bqhelper'); //
const config = require('../../../infra/configs/global_config');
const fetch = require('node-fetch');
const OAuthMiddleware = require('../../../auth/oauth2_helper');

const LLM_URL = config.get('/LLM_URL');
const authMiddleware = new OAuthMiddleware();
const oAuth2Client = authMiddleware.oAuth2Client;

const insight = async (req, res) => {
  try {
    const { param } = req.body;

    // Validate the request payload
    const isValid = validator.isValidPayload(
      param,
      queryModel.insightPayloadSchema
    );
    if (!isValid) {
      throw new Error('Invalid payload format');
    }

    // Set OAuth2 credentials
    oAuth2Client.setCredentials({
      access_token: req.session.access_token,
      refresh_token: req.session.refresh_token,
      expiry_date: req.session.expiry_time,
    });

    // Destructure request body
    const {
      project: projectId,
      dataset: datasetId,
      table: tableId,
      input,
    } = req.body;

    // Check if user has bigquery.jobs.create permission
    const isRequiredPermissionExist = await checkUserPermission(
      oAuth2Client,
      projectId
    );
    if (!isRequiredPermissionExist) {
      throw new AuthorizationError(
        'Permission Denied. You dont have bigquery.jobs.create permission. Please contact your administrator.'
      );
    }

    // Get schema of the table that user wants to query
    const { access_token: token } = oAuth2Client.credentials;
    const { fields } = await GetTable({
      projectId,
      datasetId,
      tableId,
      auth: oAuth2Client,
    });

    // Make request to llm API
    const llm = await fetch(${LLM_URL}/query, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dataset: datasetId,
        token: {
          scheme: 'Basic',
          credentials: config.LLM_CRED,
        },
        project: projectId,
        table: tableId,
        input,
        access_token: token,
        schema_column: {
          data: fields,
        },
      }),
    });

    // Parse the response to JSON
    const dataLlm = await llm.json();

    // Destructure the response from dataLlm
    const { context, nextquestion, ...restLlmData } = dataLlm;

    // Parse nextquestion from object format to array and set it to restLlmData as properties
    const questions = nextquestion ? Object.values(nextquestion) : [];
    restLlmData.questions = questions;

    // Send response with restLlmData
    sendResponse(req, res, restLlmData);
  } catch (error) {
    // Pass the error to errorHandlerMiddleware if there is error in try block
    console.log(error);
  }
};

module.exports = {
  insight,
};