const axios = require('axios').default;
const config = require('../../../../../infra/configs/global_config');

class OCA_SMS {
  constructor() {
    this.client = axios.create({
      baseURL: config.get('OCA_BASE_URL'),
      timeout: 10000,
      headers: {
        'Content-Type': 'Application/json',
        'Authorization': 'Bearer ' + config.get('/oca/token')
      }
    });
  }

  async sendMessage(phoneNumber, message) {
    const data = {
      phone_number: phoneNumber,
      message
    };

    return this.client.post('/api/v2/push/message', JSON.stringify(data));
  }

}

module.exports = OCA_SMS;
