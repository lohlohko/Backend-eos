
const logger = require('../../../../helpers/utils/logger');
const wrapper = require('../../../../helpers/utils/wrapper');
const { InternalServerError } = require('../../../../helpers/error');
const CommandProduct = require('./command');
const QueryProduct = require('../queries/query');
const { trace } = require('@opentelemetry/api');

const Storaging = require('../../../../helpers/components/storaging/index');
const ctx = 'Product-Command-Domain';

class Product {

  constructor(db) {
    this.commandProduct = new CommandProduct(db);
    this.queryProduct = new QueryProduct(db);
    this.storaging = new Storaging({ storaging: 1});
  }

  async postProduct(payload) {
    // const apmSpan = trace.getTracer('payload check').startSpan('postProduct');
    const { ...payloadProperties } = payload;
    const document = { ...payloadProperties };
    // apmSpan.end();
    const result = await this.commandProduct.insertOne(document);
    if (result.err) {
      logger.error(ctx, result.err, 'can not insert product');
      return wrapper.error(new InternalServerError('can not insert product'));
    }
    return wrapper.data(document);
  }

  async updateProduct(payload) {
    const { productId, productImage, ...payloadProperties } = payload;
    const params = { productId: productId };
    const name = 'test';
    const bucket = 'sample';
    const folder = 'product';
    const rawFile = productImage;
    if (productImage) {
      const uploadResult = await this.storaging.uploadDocument({ bucket, rawFile, name, folder });
      if (uploadResult.err) {
        logger.error(ctx, uploadResult.err, 'can not upload product image');
        return wrapper.error(new InternalServerError('can not upload product image'));
      }
      payloadProperties.productImage = uploadResult.uri;
    }
    const result = await this.commandProduct.updateOne(params, payloadProperties);
    if (result.err) {
      logger.error(ctx, result.err, 'can not update product');
      return wrapper.error(new InternalServerError('can not update product'));
    }
    return wrapper.data(payloadProperties);
  }

}

module.exports = Product;
