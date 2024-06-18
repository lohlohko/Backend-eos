const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');
const config = require('../../../../../infra/configs/global_config');

class AWS_SNS {
  constructor() {
    this.client = new SNSClient({
      region: 'ap-southeast-1',
      credentials: {
        accessKeyId: config.get('/aws').accessKeyId,
        secretAccessKey: config.get('/aws').secretAccessKey,
      }
    });
  }

  async sendMessage(phoneNumber, message) {
    const command = new PublishCommand({
      Message: message,
      MessageStructure: 'string',
      PhoneNumber: phoneNumber
    });

    return this.client.send(command);
  }

}

module.exports = AWS_SNS;
