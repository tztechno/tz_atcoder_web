// server.js
const fastify = require('fastify')({ logger: true })
const path = require('path')
const fastifyStatic = require('@fastify/static')

// Register the static plugin
fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/', // optional: default '/'
})

// Define the new endpoint
fastify.post('/api/getContest', async (request, reply) => {
    const { rate } = request.body
    let contest
    if (rate < 1200) {
        contest = 'ABC'
    } else {
        contest = 'ARC'
    }
    return { rate, contest }
})

// Start the server
const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
        console.log('Server is running at http://localhost:3000')
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
