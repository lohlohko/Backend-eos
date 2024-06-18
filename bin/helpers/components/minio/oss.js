const Minio = require('minio');
const config = require('../../../infra/configs/global_config');
const wrapper = require('../../utils/wrapper');
const logger = require('../../utils/logger');
const ctx = 'Minio-blob';
let client = {};

const objectUploadStream = async (bucketName, objectName, stream) => {
  client = new Minio.Client({
    accessKey: config.get('/minio').accessKey,
    secretKey: config.get('/minio').secretKey,
    endPoint: config.get('/minio').endPoint,
    port: parseInt(config.get('/minio').port),
    useSSL: Boolean(config.get('/minio').useSSL)
  });
  try {
    const isUploaded = await client.putObject(bucketName, objectName, stream);
    if (isUploaded) {
      const uri = `${bucketName}/${objectName}`;
      return wrapper.data({ uri, ...isUploaded });
    }
  } catch (err) {
    logger.log(ctx, err.message, 'error upload object');
    return wrapper.error(err);
  }
};

module.exports = {
  objectUploadStream
};
