const amqp = require('amqplib');

let connection;
let channel;

// Connect to RabbitMQ function with retries änd delay per attempt
async function connect(retries = 5, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      connection = await amqp.connect('amqp://rabbitmq');
      channel = await connection.createChannel();

      await channel.assertExchange('post-events', 'fanout', { durable: true });
      
      console.log('✅ Connected to RabbitMQ');
      return { connection, channel };
    } catch (err) {
      console.error(`❌ Failed to connect to RabbitMQ (attempt ${i + 1})`);
      await new Promise(res => setTimeout(res, delay * (i + 1)));
    }
  }
  throw new Error('🚨 Could not connect to RabbitMQ after several attempts');
}

function getChannel() {
  if (!channel) {
    throw new Error('RabbitMQ channel not initialized. Call connect() first.');
  }
  return channel;
}

module.exports = { connect, getChannel };
