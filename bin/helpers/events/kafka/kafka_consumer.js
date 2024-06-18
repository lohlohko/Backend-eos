const kafka = require('kafka-node');
const Consumer = kafka.ConsumerGroup;
const validate = require('validate.js');
const logger = require('../../utils/logger');

class KafkaConsumer {
  constructor(host, groupId, topic) {
    this.options = {
      kafkaHost: host.broker,
      autoCommit: false,
      fetchMaxBytes: 10 * 1024 * 1024,
      groupId: groupId,
      sessionTimeout: 15000,
      protocol: ['roundrobin'],
      fromOffset: 'latest',
      encoding: 'utf8',
      keyEncoding: 'utf8'
    };
    if(!validate.isEmpty(host.username)){
      this.options.sasl = {
        mechanism: 'plain',
        username: host.username,
        password: host.password
      };
    }
    this.topic = topic;
    this.ctx = this.constructor.name;
  }

  async subscribe(){
    const run = async () => {
      this.consumer = new Consumer(this.options, Object.keys(this.topic));
      this.consumer.on('message', async (message) => {
        const { value } = message;
        const payload = JSON.parse(value);
        const result = await this.topic[message.topic](payload);
        if(result.err){
          logger.log(this.ctx, result.err, 'Kafka Commit Fail');
        } else {
          this.consumer.commit(true, (err, data) => {
            if(err){
              logger.log(this.ctx, 'Commit Kafka Fail', 'kafkaConsumer-Commit', err);
            } else {
              logger.log(this.ctx, 'Commit Kafka Done', 'kafkaConsumer-Commit', { topic: message.topic, data: data[message.topic] });
            }
          });
        }
      });
    };

    try {
      await run();
    } catch (err){
      logger.log(this.ctx, err.message, 'Kafka Subscribe');
    }
  }
}

module.exports = KafkaConsumer;
