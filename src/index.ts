import fastify from 'fastify'
import createPDF from './functions/pdf'

const server = fastify({logger: true})

server.get('/', async (request, reply) => {
  server.log.info('Incoming request at /');
  return 'Hello there! 👋'
})

server.get('/print/:name', async (request, reply) => {
  const params = request.params as { name: string }

  server.log.info('Incoming request at /print');
  createPDF();
  return params.name
})

server.listen({port: 8000}, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Started server at ${address}`)
})