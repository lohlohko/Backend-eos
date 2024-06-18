
const sinon = require('sinon');
const Kafka = require('kafka-node');
const kafkaProducer = require('../../../../../bin/helpers/events/kafka/kafka_producer');

describe('Kafka Producer', () => {
  const payload = {
    topic: 'test-topic',
    body: { id: 'id', data: 'data'},
    partition: 0,
    attributes: 1
  };

  describe('kafkaSendProducer', () => {
    it('Should bypass produce', async () => {
      sinon.stub(Buffer, 'from');
      sinon.stub(Kafka.HighLevelProducer.prototype, 'on').returns(true);
      sinon.stub(Kafka.HighLevelProducer.prototype, 'send').returns(true);
      kafkaProducer.send(payload);
      Kafka.HighLevelProducer.prototype.on.restore();
      Kafka.HighLevelProducer.prototype.send.restore();
      Buffer.from.restore();
    });
  });

});
