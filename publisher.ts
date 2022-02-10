import * as amqplib from 'amqplib'

const amqpUrl = process.env.AMQP_URL || 'amqp://localhost:5672'
const connection = await amqplib.connect(amqpUrl, 'heartbeat=60')
const channel = await connection.createChannel()

const exchange = 'example'
const queue = 'example.hello'
const routingKey = 'hello'

try {
  await channel.assertExchange(exchange, 'direct', { durable: true })
  await channel.assertQueue(queue, { durable: true })
  await channel.bindQueue(queue, exchange, routingKey)

  const message = { content: 'Hello, World' }
  const result = channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)))
  console.log('Published message', result)
} catch(e) {
  console.error('Error publishing message', e)
} finally {
  console.info('Closing channel and connection if available')
  await channel.close()
  await connection.close()
  console.info('Channel and connection closed')
}

process.exit(0)
