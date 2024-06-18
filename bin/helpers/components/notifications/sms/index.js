const OCASMS = require('../sms/oca');
const AWSSNS = require('../sms/aws-sns');
const OcaSmsAPI = new OCASMS();
const AwsSnsAPI = new AWSSNS();
const { isValidPhoneNumber } = require('../../../utils/validator');
const { formatPhoneNumber } = require('../../../utils/text_formatter');
const logger = require('../../../utils/logger');
const wrapper = require('../../../utils/wrapper');

const OCA = 'oca';
const BIGBOX_SMS = 'bigbox-sms';
const AWS_SNS = 'aws-sns';

const AVAILABLE_PROVIDERS = [OCA, BIGBOX_SMS, AWS_SNS];
const providerConfig = [
  {
    name: OCA,
    module: OcaSmsAPI
  },
  {
    name: AWS_SNS,
    module: AwsSnsAPI
  }
];

class SMSNotification {
  constructor(provider = OCA) {
    this.module = null;
    this.provider = provider;
    this._getProvider();
  }

  /**
   * @private
   * validate providers
   *
   * @returns {Boolean}
   */
  _getProvider() {
    const isAvailableProvider = AVAILABLE_PROVIDERS.includes(this.provider);
    if (!isAvailableProvider) throw new Error('provider_unavailable');

    providerConfig.find(item => {
      if (item.name === this.provider) {
        this.module = item.module;
      }
    });

    return true;
  }

  getAvailableProviders() {
    return AVAILABLE_PROVIDERS;
  }

  async send(to, message) {
    const cleanPhone = formatPhoneNumber(to);
    const isValidPhone = isValidPhoneNumber(cleanPhone);
    if (!isValidPhone) throw new Error('phone_number_not_valid');

    try {
      await this.module.sendMessage(to, message);
      return wrapper.data({
        message: 'message_sent'
      });
    } catch (error) {
      logger.error(error);

      return wrapper.error(error);
    }
  }

}

module.exports = SMSNotification;
