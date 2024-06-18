const url = require('url');
const { google } = require('googleapis');
//=======================================================
const wrapper = require('../helpers/utils/wrapper');
const { ERROR} = require('../helpers/http-status/status_code');
const { ForbiddenError, UnauthorizedError } = require('../helpers/error');
//========================================================================
const config = require('../infra/configs/global_config');
const FRONTEND_REDIRECT_URL = config.get('/redirectUrl/redirect_url_frontend');
const BACKEND_REDIRECT_URL = config.get('/redirectUrl/redirect_url_backend');
const clientId = config.get('/googleApi/client_id');
const clientSecret = config.get('/googleApi/client_secret');
const redirectUri = config.get('/googleApi/redirect_uri');
//=======================================================

class OauthController {

  constructor(){
    this.oAuth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUri,
    );
    
    this.login = this.login.bind(this);
    this.callback = this.callback.bind(this);
    this.userInfo = this.userInfo.bind(this);
    this.logout = this.logout.bind(this);
  }

  //================= Schema Direct to Page Login ==========================
  async login (req, res, next){
    const { fe } = req.query;
    try {
      // URL Google OAuth untuk autentikasi
      const authorizationUrl = this.oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        include_granted_scopes: true,
        prompt: 'consent',
        scope: ['https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/userinfo.email',
        ],
      });

      if (fe) {
        req.session.fe = 'FRONTEND_REDIRECT_URL';
      }


      //Kirim URL autentikasi ke klien sebagai respons
      res.redirect(authorizationUrl, next)
      
    } catch (error) {
      console.error('Error:', error);
      const unauthorizederror = new UnauthorizedError('Invalid Login not success!');
      return wrapper.response(res, 'fail', { err: unauthorizederror, data: null }, 'Invalid Login not success!', ERROR.FORBIDDEN);
    }
  };
  
  //================= Schema after client Login ==========================
  async callback (req, res, next){
    try{
      const { code } = req.query;
      const { tokens } = await this.oAuth2Client.getToken(code);
      this.oAuth2Client.setCredentials(tokens);

      req.session.access_token = tokens.access_token;
      req.session.refresh_token = tokens.refresh_token;
      req.session.expire_time = tokens.expiry_date;
  
      console.log('Token Response:', tokens);

      const result = await this.oAuth2Client.request({
        url: 'https://people.googleapis.com/v1/people/me?personFields=names'
      });

      console.log('Authentication successful! Please return to the console.', result.data);

      if (req.session.fe) {
        res.redirect(FRONTEND_REDIRECT_URL, next);
      } else {
        res.redirect(BACKEND_REDIRECT_URL, next);
      }
    }catch (error) {
      console.error('Error:', error);
      const forbiddenError = new ForbiddenError('Invalid in callback!');
      return wrapper.response(res, 'fail', { err: forbiddenError, data: null }, 'Invalid in callback!', ERROR.FORBIDDEN);
    }
  };

  //================= Schema get user info ==========================
  async userInfo (req, res){
    try {
      // Mendapatkan user info
      const result = await this.oAuth2Client.request({
        url: 'https://www.googleapis.com/oauth2/v1/userinfo'
      });

      const userDetails = result.data;

      res.send({
        status: 'success',
        message: 'User info retrieved successfully',
        data: userDetails
      });

    } catch (error) {
      console.error('Error:', error);
      const forbiddenError = new ForbiddenError('Invalid get user info!');
      return wrapper.response(res, 'fail', { err: forbiddenError, data: null }, 'Invalid get user info!', ERROR.FORBIDDEN);
    }
  };
  
  //================= Schema logout ==========================
  async logout (req, res) {
    try {
      // Mendapatkan user credential
      const user = this.oAuth2Client.credentials;
      this.oAuth2Client.revokeToken(user.refresh_token);
      this.oAuth2Client.revokeCredentials();


      req.session.destroy();

      res.send({
        status: 'success',
        message: 'Logout Success',
      });
    } catch (error) {
      console.error('Error:', error);
      const unauthorizederror = new UnauthorizedError('Invalid Logout not success!');
      return wrapper.response(res, 'fail', { err: unauthorizederror, data: null }, 'Invalid Logout not success!', ERROR.FORBIDDEN);
    }
  }
}
module.exports = OauthController;
