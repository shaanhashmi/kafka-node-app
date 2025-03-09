const { kafka } = require('./client');
const group = process.argv[2];
const init = async () => {
  const consumer = kafka.consumer({ groupId: group });
  console.log('Connecting...');
  await consumer.connect();
  console.log('Connected!');

  await consumer.subscribe({ topics: ['rider-status'], fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        groupId: group,
        topic,
        partition,
        value: message.value.toString(),
      });
    },
  });
};

init().catch(console.error);
