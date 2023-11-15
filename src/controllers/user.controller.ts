import { FastifyReply, FastifyRequest } from "fastify";
import { IUser } from "interfaces";

const staticUsers: IUser[] = [
    {
        id: 1,
        name: 'Joyce Byers',
    },
    {
        id: 2,
        name: 'Théo Dreves',
    },
]

export const listUsers = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    Promise.resolve(staticUsers)
    .then((users) => {
        reply.send({ data: users })
    })
}

export const getUser = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    staticUsers.forEach(user => {
        if (user.id == Number(request.params['id'])) {
            Promise.resolve(user)
            .then((u) => {
                reply.send({ data: u })
            })
        }
    });
}

export const addUser = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    let biggestId = 0
    staticUsers.forEach(user => {
        if (user.id > biggestId) biggestId = user.id;
    })
    request.body['id'] = biggestId + 1
    staticUsers.push(request.body as IUser)

    Promise.resolve(request.body)
    .then((u) => {
        reply.send({ data: u })
    })
}

export const updateUser = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    staticUsers.forEach(usr => {
        if (usr.id == request.params['id']) {
            if ('name' in (request.body as Partial<IUser>)) {
                usr.name = request.body['name']
            } 
            if ('score' in (request.body as Partial<IUser>)) {
                usr.score = request.body['score']
            }
        
            Promise.resolve(usr)
            .then(u => {
                reply.send({ data: u })
            })
        }
    });
}
