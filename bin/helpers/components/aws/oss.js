const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const config = require('../../../infra/configs/global_config');
const wrapper = require('../../utils/wrapper');
const logger = require('../../utils/logger');
const ctx = 'Aws-blob';

const objectUploadStream = async (bucketName, objectName, stream) => {
  const client = new S3Client({
    region: 'ap-southeast-1',
    credentials: {
      accessKeyId: config.get('/aws').accessKeyId,
      secretAccessKey: config.get('/aws').secretAccessKey,
    }
  });

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: objectName,
    Body: stream
  });

  try {
    const response = await client.send(command);
    if (response.$metadata.httpStatusCode === 200) {
      const { uri, ...data } = response.$metadata;
      return wrapper.data({ uri, ...data });
    }
  } catch (err) {
    logger.log(ctx, err.message, 'error upload object');
    return wrapper.error(err);
  }
};

module.exports = {
  objectUploadStream
};
