const ClientError = require('../error/client_error')
const { ERROR } = require('../http-status/status_code');
const { ForbiddenError} = require('../../helpers/error');
const wrapper = require('../../helpers/utils/wrapper');
const tokenExpired = require('../components/tokenExpired');
const OAuthMiddleware = require('../../auth/oauth2_helper');
const authMiddleware = new OAuthMiddleware();
const oAuth2Client = authMiddleware.oAuth2Client;
const Firestore = require('../../helpers/databases/Firestore/services')
//=======================================================
const getSessionId = (cookies) => {
  try {
    const { 'connect.sid': cookie } = cookies;
    if (!cookie) {
      throw new ClientError('Session cookie is missing');
    }
    return cookie.split('.')[0].slice(2); // assuming the sessionId is encoded and prefixed
  } catch (error) {
    console.error('Error getting sessionId from cookies:', error);
    throw new ClientError('Error extracting sessionId');
  }
}
// const checkCredentials = async (req, res, next) => {
//   try {
//     const cookies = req.cookies || {};
//     const sessionId = getSessionId(cookies)
//     if (!sessionId) {
//       throw new ClientError('Cookie header is missing');
//     }

//     const { access_token, refresh_token, expiry_time } = req.session;
//     oAuth2Client.setCredentials({
//       access_token,
//       refresh_token,
//       expiry_date: expiry_time,
//     });

//     // Set ulang token jika expired
//     if (tokenExpired(expiry_time)) {
//       const { credentials } = await oAuth2Client.refreshAccessToken();
//       req.session.access_token = credentials.access_token;
//       req.session.expiry_time = credentials.expiry_date;
//     } else {
//       oAuth2Client.setCredentials({ 
//         access_token,
//         refresh_token,
//         expiry_date: expiry_time, 
//       });
//     }
//     next();
//   } catch (error) {
//     console.error('Error in checkCredentials middleware:', error);
//     const forbiddenError = new ForbiddenError('Invalid checkCredentials middleware!');
//     return wrapper.response(res, 'fail', { err: forbiddenError, data: null }, 'Invalid checkCredentials middleware!', ERROR.FORBIDDEN);

//   }
// }

const checkCredentials = async (req, res, next) => {
  try {
    const connectSid = req.headers.cookie ? req.headers.cookie.split('; ').find((cookie) => cookie.startsWith('connect.sid')) : null;
    if (!connectSid) throw new ClientError('Please send connect.sid cookie or login first');
    console.log('cookies:', connectSid)

    const sessionId = await getSessionId(req.cookies)
    if (!sessionId) {
      throw new ClientError('Cookie header is missing');
    }

    const cookieSession = await Firestore.getTokenBySessionId(sessionId);
    const { 
      access_token: accessToken, 
      refresh_token: refreshToken, 
      expiry_time: expireTime,
    } = cookieSession;

    oAuth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
      expiry_date: expireTime,
    });

    if (tokenExpired(expireTime)) {
      try {
        const { credentials } = await oAuth2Client.refreshAccessToken();
        req.session.access_token = credentials.access_token;
        req.session.expiry_time = credentials.expiry_date;
        oAuth2Client.setCredentials({
          access_token: credentials.access_token,
          refresh_token: credentials.refresh_token,
          expiry_date: credentials.expiry_date,
        });

        cookieSession.access_token = credentials.access_token;
        cookieSession.refresh_token = credentials.refresh_token;
        cookieSession.expire_time = credentials.expiry_date;
        await Firestore.updateSession(sessionId, cookieSession);
  
      } catch (error) {
        console.error('Error refreshing access token:', error);
        throw new ClientError('Error refreshing access token');
      }
    } 
    next();
  } catch (error) {
    console.error('Error in checkCredentials middleware:', error);
    const forbiddenError = new ForbiddenError('Invalid checkCredentials middleware!');
    return wrapper.response(res, 'fail', { err: forbiddenError, data: null }, 'Invalid checkCredentials middleware!', ERROR.FORBIDDEN);
}
}

//Function to delete a session
const deleteSession = async (req, res, next) => {
  try {
    const sessionId = await getSessionId(req.cookies);
    if (!sessionId) {
      throw new ClientError('Session ID is missing');
    }
    await Firestore.deleteSessionById(sessionId);
    next();
  } catch (error) {
    console.error('Error deleting session:', error);
    const clientError = new ClientError('Error deleting session');
    return next(clientError);
  }
};
module.exports = {
  checkCredentials,
  deleteSession,
}
