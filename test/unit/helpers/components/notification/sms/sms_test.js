
const assert = require('assert');
const sinon = require('sinon');
const logger = require('../../../../../../bin/helpers/utils/logger');
const OCASMS = require('../../../../../../bin/helpers/components/notifications/sms/oca');
const AWSSNS = require('../../../../../../bin/helpers/components/notifications/sms/aws-sns');
const SMSNotification = require('../../../../../../bin/helpers/components/notifications/sms');

describe('SMSNotification', () => {
  beforeEach(() => {
    sinon.stub(logger, 'log');
  });
  afterEach(() => {
    logger.log.restore();
    sinon.restore()
  });

  describe('#send', () => {
    it('should be success sent sms message using OCA', async () => {
      const SMSService = new SMSNotification('oca')

      sinon.stub(OCASMS.prototype, 'sendMessage').resolves({ status: 200, message: 'ok' });
      const to = '+628217728881'
      const message = 'Hello dear'

      const res = await SMSService.send(to, message)
     
      assert.deepEqual(res.data, {
        message: 'message_sent'
      });
     
    });

    it('should be success sent sms message using AWS SNS', async () => {
      const SMSService = new SMSNotification('aws-sns')

      sinon.stub(AWSSNS.prototype, 'sendMessage').resolves({ status: 200, message: 'ok' });
      const to = '+628217728881'
      const message = 'Hello dear'

      const res = await SMSService.send(to, message)
     
      assert.deepEqual(res.data, {
        message: 'message_sent'
      });
     
    });

    it('should error sent sms message', async () => {
      const SMSService = new SMSNotification()
      sinon.stub(OCASMS.prototype, 'sendMessage').rejects('error_sent_sms');
      const to = '+628217728881'
      const message = 'Hello dear'

      const res = await SMSService.send(to, message)
      assert.equal(res.err, 'error_sent_sms');
    });
  });
});
