
const sinon = require('sinon');
const assert = require('assert');
const kafkaConsumer = require('../../../../../bin/helpers/events/kafka/kafka_consumer');
const Kafka = require('kafka-node');

describe('ConsumerKafka', () => {
  const host = {
    broker: 'broker',
    username: 'username',
    password: 'password'
  };
  const groupId = 'test-groupid';
  const topic = 'test-topic';
  describe('Consumer', () => {
    it('Should success consume', async () => {
      sinon.stub(Kafka, 'ConsumerGroup').resolves({});
      const result = new kafkaConsumer(host, groupId, topic);
      assert.equal(result.topic, 'test-topic');
      Kafka.ConsumerGroup.restore();
    });
  });

});
