const { getChannel } = require('../rabbit/rabbit');
const { updateAuthorName } = require('../src/services/post.service');

async function setupAuthConsumer() {
  const channel = getChannel();

  const exchange = 'auth-events';
  const queue = 'post-service-auth-updates'; // cada serviço deve ter sua própria fila

  await channel.assertExchange(exchange, 'fanout', { durable: true });
  await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(queue, exchange, '');

  channel.consume(queue, async (msg) => {
    if (!msg) return;

    try {
      const event = JSON.parse(msg.content.toString());
      
      if (event.type === 'user_updated') {
        console.log('🟢 Received user_updated:', event.payload);
        
        // Update author name in all posts by this user
        await updateAuthorName(event.payload.id, event.payload.name);
      }

      channel.ack(msg);
    } catch (error) {
      console.error('❌ Error processing message:', error.message);
      channel.nack(msg, false, false); // Don't requeue failed messages
    }
  });

  console.log(`📥 Listening to '${exchange}' -> '${queue}'`);
}

module.exports = setupAuthConsumer;
