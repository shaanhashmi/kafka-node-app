const { kafka } = require('./client');

const init = async () => {
  const admin = kafka.admin();
  console.log('Connecting...');
  await admin.connect();
  console.log('Connected!');

  console.log('Creating topic... rider-status');
  await admin.createTopics({
    topics: [{ topic: 'rider-status', numPartitions: 2 }],
  });
  console.log('Created!');

  console.log('Admin Disconnected');
  await admin.disconnect();
};

init();
