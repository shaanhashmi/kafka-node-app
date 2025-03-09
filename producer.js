const { kafka } = require('./client');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const init = async () => {
  const producer = kafka.producer();
  console.log('Connecting...');
  await producer.connect();
  console.log('Connected!');

  rl.setPrompt('Enter your message: > ');
  rl.prompt();

  rl.on('line', async (line) => {
    const [riderName, location] = line.split(' ');
    console.log('Sending...');
    await producer.send({
      topic: 'rider-status',
      messages: [
        {
          partition: location.toLowerCase() === 'north' ? 0 : 1,
          key: 'location-update',
          value: JSON.stringify({ name: riderName, location }),
        },
      ],
    });
    console.log('Sent!');
  }).on('close', async () => {
    console.log('Producer Disconnected');
    await producer.disconnect();
  });
};

init().catch(console.error);
