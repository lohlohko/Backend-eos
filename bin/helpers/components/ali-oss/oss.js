const AliOSS = require('ali-oss');
const config = require('../../../infra/configs/global_config');
const wrapper = require('../../utils/wrapper');
const logger = require('../../utils/logger');
const ctx = 'Ali-blob';

const objectUploadStream = async (bucketName, objectName, stream) => {
  const client = new AliOSS({
    region: config.get('/alioss').region,
    accessKeyId: config.get('/alioss').accessKeyId,
    accessKeySecret: config.get('/alioss').accessKeySecret,
    bucket: config.get('/alioss').bucket,
    endpoint: config.get('/alioss').endpoint
  });
  try {
    const isUploaded = await client.put(`${bucketName}/${objectName}`, stream);
    if (isUploaded) {
      return wrapper.data({ uri: isUploaded.url, ...isUploaded });
    }
  } catch (err) {
    logger.log(ctx, err.message, 'error upload object');
    return wrapper.error(err);
  }
};

module.exports = {
  objectUploadStream
};
