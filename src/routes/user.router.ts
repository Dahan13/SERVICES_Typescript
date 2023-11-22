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
        handler: controllers.createUser,
    })

    fastify.route({
        method: 'GET',
        url: '/:id',
        handler: controllers.getUser,
    })

    fastify.route({
        method: 'PUT',
        url: '/:id',

        handler: controllers.updateUser,
    })
}

export default userRouter