// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//    response.write('Hello World!');

//    return response.end()
// })

// server.listen(3333)

// POST localhost:3333/videos
// DELETE localhost:3333/videos/1

import { fastify } from 'fastify'
// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

// const database =  new DatabaseMemory()
const database = new DatabasePostgres()

// GET, POST, PUT, DELETE, PATCH
// POST localhost:3333/videos
// POST localhost:3333/videos/3

// Route Parameter

// Request Body

server.post('/videos', async (request, reply) => {
    const {title, description, duration } = request.body

    await database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})

server.get('/videos', async (request) => {
    const search = request.query.search

    const videos = await database.list(search)

    return videos
})

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const {title, description, duration } = request.body

    await database.update(videoId, {
        title, // ou title: title, description: description, duration: duration
        description,
        duration,
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
})