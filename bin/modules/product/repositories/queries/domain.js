
const wrapper = require('../../../../helpers/utils/wrapper');
const logger = require('../../../../helpers/utils/logger');
const { NotFoundError } = require('../../../../helpers/error');
const QueryProduct = require('./query');
const ctx = 'Product-Query-Domain';

class Product {

  constructor(db) {
    this.queryProduct = new QueryProduct(db);
  }

  async getProduct(payload) {
    const product = await this.queryProduct.findOne({ productId: payload.productId }, { productId: 1, productName: 1 });
    if (product.err) {
      logger.error(ctx, product.err, 'can not find product');
      return wrapper.error(new NotFoundError('can not find product'));
    }
    const { data } = product;
    return wrapper.data(data);
  }

  async listProduct(payload) {
    const {page, limit, ...payloadProperties} = payload;
    const query = {...payloadProperties};
    const projection = {
      productId: 1,
      productName: 1,
    };
    const sort = { createdAt : -1 };
    const product = await this.queryProduct.findMany(query, projection, sort, page, limit);
    if (product.err) {
      logger.warn(ctx, product.err, 'can not find list product');
      product.data = [];
    }
    const { data } = product;
    return wrapper.data(data);
  }
}


module.exports = Product;
