import { FastifyInstance } from 'fastify'
import * as controllers from '../controllers/user.controller'

async function userRouter(fastify: FastifyInstance) {

    fastify.route({
        method: 'GET',
        url: '/',
        handler: controllers.listUsers,
    })

    fastify.route({
        method: 'POST',
        url: '/',
        handler: async (request, reply) => {
            controllers.createUser(request, reply)
        },
    })

    fastify.route({
        method: 'GET',
        url: '/:id',
        handler: async (request, reply) => {
            controllers.getUser(request, reply)
        },
    })

    fastify.route({
        method: 'PUT',
        url: '/:id',

        handler: async (request, reply) => {
            controllers.updateUser(request, reply)
        },
    })
}

export default userRouter