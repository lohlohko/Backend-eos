const assert = require('assert');
const sinon = require('sinon');
const logger = require('../../../../../bin/helpers/utils/logger');
const { S3Client } = require('@aws-sdk/client-s3')
const db = require('../../../../../bin/helpers/components/aws/oss');


describe('Aws-oss', () => {
  beforeEach(() => {
    sinon.stub(logger, 'log');
  });
  afterEach(() => {
    logger.log.restore();
  });


  describe('#objectUploadStream', () => {
    const streamBuffer = new Buffer('Image');
    it('should be cover success path object upload stream', async () => {
      sinon.stub(S3Client.prototype, 'send').resolves({
        err: null,
        $metadata: {
          httpStatusCode: 200
        }
      });
      const res = await db.objectUploadStream('mybucket', 'imageName', streamBuffer);
      assert.equal(res.err, null);
      S3Client.prototype.send.restore();
    });
    it('should be cover error path object upload stream', async () => {
      await db.objectUploadStream('mybucket', streamBuffer);
    });
  });
});
