const {httpStatus} = require('../http-status/index')

class BaseApi {
    
  constructor(){
  }

  register() {
    // Your implementation for the register method
    // Add your specific logic here
  }

  /**
 * Global method to send API response
 * @param {object} res
 * @param {object} statusCode
 */
  send(res, statusCode = httpStatus.statusOK) {
    let obj = res.locals.data;

    res.status(statusCode).send({
      message: 'success',
      status: statusCode,
      data: obj,
    });
  }
}

module.exports = BaseApi;