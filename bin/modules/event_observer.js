const config = require('../infra/configs/global_config');
const logger = require('../helpers/utils/logger');
const KafkaConsumer = require('../helpers/events/kafka/kafka_consumer');
const kafkaHost = config.get('/kafka');
const sample = require('./sample-listeners/handlers/event_handler');
const { TOPIC } = require('../helpers/topics');
const groupId = 'sample';
const ctx = 'App-Observer';

const firstGroup = {};
firstGroup[TOPIC.SAMPLE_CREATED] = sample.postSample;
firstGroup[TOPIC.SAMPLE_UPDATED] = sample.updateSample;

const init = async () => {
  logger.log(ctx, 'Initiating observer...');
  process.on('unhandledRejection', (reason, p) => {
    p.catch(err => {
      logger.log(ctx, reason, err.stack);
    });
  });
  const consumerKafka = new KafkaConsumer(kafkaHost, `${groupId}-1`, firstGroup);
  await consumerKafka.subscribe();
};

module.exports = {
  init: init
};
