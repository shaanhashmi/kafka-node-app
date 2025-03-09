const { Kafka, Partitioners } = require('kafkajs');

exports.kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['192.168.1.67:9092'],
});