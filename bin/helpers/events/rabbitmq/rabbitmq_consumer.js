const amqp = require('amqplib');
const logger = require('../../utils/logger');

class RabbitMQConsumer {
  constructor(connectionOptions, queue) {
    this.connectionOptions = connectionOptions;
    this.queue = queue;
    this.channel = null;
    this.ctx = this.constructor.name;
  }

  async subscribe(callback) {
    try {
      const connection = await amqp.connect(this.connectionOptions);
      this.channel = await connection.createChannel();

      await this.channel.assertQueue(this.queue);
      await this.channel.consume(this.queue, async (msg) => {
        const message = msg.content.toString();
        const payload = JSON.parse(message);
        const result = await callback(payload);

        if (result && result.err) {
          logger.log(this.ctx, result.err, 'RabbitMQ Consumer Commit Fail');
        } else {
          this.channel.ack(msg);
          logger.log(this.ctx, 'RabbitMQ Consumer Commit Done', 'RabbitMQ Consumer Commit');
        }
      });

      logger.info(this.ctx, 'RabbitMQ Consumer subscribed to queue', 'RabbitMQ Consumer Subscribe', { queue: this.queue });
    } catch (error) {
      logger.error(this.ctx, 'RabbitMQ Consumer error subscribing to queue', 'RabbitMQ Consumer Subscribe', { queue: this.queue, error });
    }
  }

  async unsubscribe() {
    if (this.channel) {
      await this.channel.close();
      this.channel = null;
    }
  }
}

module.exports = RabbitMQConsumer;
