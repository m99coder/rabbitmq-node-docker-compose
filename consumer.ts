import * as amqplib from 'amqplib'

const amqpUrl = process.env.AMQP_URL || 'amqp://localhost:5672'
const connection = await amqplib.connect(amqpUrl, 'heartbeat=60')

const channel = await connection.createChannel()
channel.prefetch(10)
const queue = 'example.hello'

process.once('SIGINT', async () => {
  console.log('Received SIGINT, closing connection')
  await channel.close()
  await connection.close()
  process.exit(0)
})

await channel.assertQueue(queue, { durable: true })
await channel.consume(
  queue,
  async (msg) => {
    console.log('Processing message', msg?.content.toString())
    channel.ack(msg!)
  },
  {
    noAck: false,
    consumerTag: 'example.hello.consumer'
  }
)

console.log('Waiting for messages… Press [CTRL+C] to exit')
