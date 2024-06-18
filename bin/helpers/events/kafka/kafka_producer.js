const kafka = require('kafka-node');
const logger = require('../../utils/logger');
const config = require('../../../infra/configs/global_config');
const validate = require('validate.js');
const kafkaHost = config.get('/kafka');
const ctx = 'kafka-producer';

const options = {
  kafkaHost: kafkaHost.broker
};

if(!validate.isEmpty(kafkaHost.username)){
  options.sasl = {
    mechanism: 'plain',
    username: kafkaHost.username,
    password: kafkaHost.password
  };
}

const client = new kafka.KafkaClient(options);
const producer = new kafka.HighLevelProducer(client);

producer.on('ready', () => {
  logger.info(ctx, 'Kafka producer ready', 'kafkaSendProducer');
});

producer.on('error', async (error) => {
  logger.error(ctx, 'Kafka producer error', 'kafkaSendProducer', error);
});

const send = (topic, body) => {
  const buffer = Buffer.from(JSON.stringify(body));
  const record = [
    {
      topic: topic,
      messages: buffer,
      attributes: 1,
      partitionerType: 0
    }
  ];
  producer.send(record, (err) => {
    if (err) {
      logger.error(ctx, 'Kafka producer error publishing to topic', 'kafkaSendProducer', { topic, err });
    } else {
      logger.debug(ctx, 'Kafka producer success publishing to topic', 'kafkaSendProducer', topic);
    }
  });
};

module.exports = {
  send
};
