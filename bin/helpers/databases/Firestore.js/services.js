// const { Firestore } = require('@google-cloud/firestore');
// const { FirestoreStore } = require('@google-cloud/connect-firestore');
// const config = require('../../../infra/configs/global_config');
// const PROJECT_ID = config.get('/googleApi/project_id');
// const DATABASE_ID = config.get('/googleApi/database_id');
// const PRIVATE_KEY = config.get('/googleApi/private_key');
// const CLIENT_EMAIL = config.get('/googleApi/client_email'); 
const { UnauthorizedError} = require('../../error');
const { db } = require('../../../app/store')
// // Initialize Firestore
// const client = new Firestore({
//   projectId: PROJECT_ID,
//   credentials: {
//     client_email: CLIENT_EMAIL,
//     private_key: PRIVATE_KEY.replace(/\\n/g, '\n')
//   }
// });


// // Configure Firestore session store
// const store = new FirestoreStore({
//   dataset: client,
//   kind: 'express-sessions' // Collection name in Firestore
// });

// Method to get token by session id
const getTokenBySessionId = async (sessionId) => {
  try {
    console.log(`Getting token for session ID: ${sessionId}`);
    const sessionData = await getSession(sessionId);
    const { access_token, refresh_token, expire_time } = sessionData;
    return {
      access_token,
      refresh_token,
      expire_time,
    };
  } catch (error) {
    console.error('Error getting token by session ID:', error);
    throw error;
  }
};

// Method to get session data from the database
const getSession = async (sessionId) => {
  try {
    console.log(`Getting session for ID: ${sessionId}`);
    const snapshot = await db.collection('express-sessions').doc(sessionId).get();
    if (!snapshot.exists) {
      console.error(`Session ID: ${sessionId} not found`);
      throw new UnauthorizedError('Your session is not found. Please login first');
    }
    
    const session = snapshot.data();
    if (!session || !session.data) {
      console.error(`Session data for ID: ${sessionId} is empty or malformed`);
      throw new UnauthorizedError('Your session is not found. Please login first');
    }
    
    const sessionDataCookie = JSON.parse(session.data);
    if (!sessionDataCookie.refresh_token) {
      console.error(`Session ID: ${sessionId} has expired or missing refresh token`);
      throw new UnauthorizedError('Your session has expired. Please login first');
    }
    
    return sessionDataCookie;
  } catch (error) {
    console.error('Error getting session:', error);
    throw error;
  }
};

// Method to update session when the token is refreshed
const updateSession = async (sessionId, data) => {
  try {
    console.log(`Updating session for ID: ${sessionId}`);
    const session = await getSession(sessionId);
    const sessionFix = {
      ...session,
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expire_time: data.expire_time,
    };
  
    const sessionString = JSON.stringify(sessionFix);
    const refPath = db.collection('express-sessions').doc(sessionId);
    await refPath.update({ data: sessionString });
    console.log(`Session for ID: ${sessionId} updated successfully`);
  } catch (error) {
    console.error('Error updating session:', error);
    throw error;
  }
};

const deleteSessionById = async (sessionId) => {
  try {
    console.log(`Deleting session for ID: ${sessionId}`);
    const sessionRef = db.collection('express-sessions').doc(sessionId);
    const sessionDoc = await sessionRef.get();

    if (!sessionDoc.exists) {
      console.error(`Session ID: ${sessionId} not found for deletion`);
      throw new UnauthorizedError('Your session is not found. Please login first');
    }

    await sessionRef.delete();
    console.log(`Session for ID: ${sessionId} deleted successfully`);
  } catch (error) {
    console.error('Error deleting session:', error);
    throw error;
  }
};
module.exports = { 
  getSession,
  getTokenBySessionId,
  updateSession,
  deleteSessionById,
};