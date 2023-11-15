import { FastifyInstance } from "fastify";
import * as controllers from '../controllers'
import { userCreateSchema } from "../schema/user.schema";

async function userRouter(fastify: FastifyInstance) {

    fastify.route({
        method: 'GET',
        url: '/',
        handler: controllers.listUsers
    })

    fastify.route({
        method: 'GET',
        url: '/:id',
        handler: controllers.getUser
    })

    fastify.route({
        method: 'POST',
        url: '/',
        schema: userCreateSchema,
        handler: controllers.addUser
    })

    fastify.route({
        method: 'PUT',
        url: '/:id',
        handler: controllers.updateUser
    })
}

export default userRouter