const validate = require('validate.js');
const fs = require('fs');
const fileType = require('file-type');
const { Buffer } = require('buffer');
const logger = require('../../utils/logger');
const wrapper = require('../../utils/wrapper');
const { BadRequestError, InternalServerError } = require('../../error');
const config = require('../../../infra/configs/global_config');
const storageProvider = config.get('/storageProvider');
const { v4: guid } = require('uuid');
const ctx = 'Helper-Storaging';

class Storaging {
  constructor() {
    const validProviders = ['minio', 'alioss', 's3', 'azureblob'];
    if (!validProviders.includes(storageProvider)) {
      throw new Error(`Invalid storage provider: ${storageProvider}`);
    }

    switch (storageProvider) {
    case 'minio':
      this.provider = require('../minio/oss.js');
      break;
    case 'alioss':
      this.provider = require('../ali-oss/oss.js');
      break;
    case 's3':
      this.provider = require('../aws/oss.js');
      break;
    default:
      throw new Error(`Invalid storage provider: ${storageProvider}`);
    }
  }

  async uploadDocument(payload) {
    const allowedExt = ['jpg', 'jpeg', 'png', 'webp', 'pdf'];
    const limitSize = 2097152;
    const { bucket, rawFile, name, folder } = payload;
    const fileStream = { stream: {}, ext: '', size: 0 };
    if (validate.isString(rawFile)) {                                    // base64 handling
      fileStream.stream = Buffer.from(rawFile, 'base64');
      fileStream.size = fileStream.stream.length;
      const { ext } = await fileType.fromBuffer(fileStream.stream);
      fileStream.ext = ext;
    } else {                                                            // formdata file handling
      fileStream.stream = fs.createReadStream(rawFile.path);
      fileStream.size = rawFile.size;
      const { ext } = await fileType.fromFile(rawFile.path);
      fileStream.ext = ext;
    }

    if (fileStream.size > limitSize) {
      logger.warn(ctx, 'false file size', 'uploadDocument');
      return wrapper.error(new BadRequestError('Ukuran file terlalu besar.'));
    }
    if (!allowedExt.find(ext => ext === fileStream.ext)) {
      logger.warn(ctx, 'false file format', 'uploadDocument', fileStream.ext);
      return wrapper.error(new BadRequestError('Format file tidak dapat diterima.'));
    }

    const bucketName = validate.isEmpty(bucket) ? 'mybucket' : bucket;
    const imageId = guid();
    const fileUpload = await this.provider.objectUploadStream(bucketName, `${folder}/${name}-${imageId}.${fileStream.ext}`, fileStream.stream);
    if (fileUpload.err) {
      logger.warn(ctx, 'Cannot upload file', 'uploadDocument', fileUpload.err);
      return wrapper.error(new InternalServerError('Tidak dapat mengupload dokumen'));
    }
    return fileUpload.uri;
  }
}

module.exports = Storaging;
