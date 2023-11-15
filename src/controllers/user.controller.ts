import { FastifyReply, FastifyRequest } from "fastify"
import { IUser } from "../interfaces"
import type * as s from 'zapatos/schema'
import * as db from 'zapatos/db'
import pool from '../db/pgPool'

const staticUsers: IUser[] = [
    {
        id: 1,
        name: 'Joyce Byers'
    },
    {
        id: 2,
        name: 'Jim Hopper'
    },
    {
        id: 3,
        name: 'Eleven'
    }
]

export const listUsers =
    async (request: FastifyRequest, reply: FastifyReply) => {
        return db.sql<s.users.SQL, s.users.Selectable[]>`SELECT * FROM ${"users"}`
            .run(pool)
            .then((users) => ({ data: users }))
    }

export async function getUser(request: FastifyRequest, reply: FastifyReply) {
    const id = Number(request.params['id'])
    for (let i = 0; i < staticUsers.length; i++) {
        if (staticUsers[i].id === id) {
            reply.send({ data: staticUsers[i] })
        }
    }
    reply.send({ data: 'User not found' })
}

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
    let biggestId = 0
    for (let i = 0; i < staticUsers.length; i++) {
        if (staticUsers[i].id > biggestId) {
            biggestId = staticUsers[i].id
        }
    }

    request.body["id"] = biggestId + 1
    staticUsers.push(request.body as IUser)
    Promise.resolve(staticUsers)
        .then((users) => {
            reply.send({ data: users })
        })
}

export function updateUser(request: FastifyRequest, reply: FastifyReply) {
    const id = Number(request.params['id'])
    for (let i = 0; i < staticUsers.length; i++) {
        if (staticUsers[i].id === id) {
            const newInfos = request.body
            for (let j = 0; j < Object.keys(newInfos).length; j++) {
                staticUsers[i][Object.keys(newInfos)[j]] = newInfos[Object.keys(newInfos)[j]]
            }
            reply.send({ data: staticUsers[i] })
        }
    }
}