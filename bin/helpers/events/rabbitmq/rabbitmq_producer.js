const amqp = require('amqplib');
const logger = require('../../utils/logger');
const config = require('../../../infra/configs/global_config');
const rabbitmqConfig = config.get('/rabbitmq');
const ctx = 'rabbitmq-producer';

const connectionOptions = {
  hostname: rabbitmqConfig.hostname,
  port: rabbitmqConfig.port,
  username: rabbitmqConfig.username,
  password: rabbitmqConfig.password,
  vhost: rabbitmqConfig.vhost,
};

const send = async (queue, body) => {
  try {
    const connection = await amqp.connect(connectionOptions);
    const channel = await connection.createChannel();

    await channel.assertQueue(queue);
    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(body)));

    logger.debug(ctx, 'RabbitMQ producer success publishing to queue', 'rabbitmqSendProducer', queue);

    await channel.close();
    await connection.close();
  } catch (error) {
    logger.error(ctx, 'RabbitMQ producer error publishing to queue', 'rabbitmqSendProducer', { queue, error });
  }
};

module.exports = {
  send
};
