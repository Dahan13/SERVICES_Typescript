import { FastifyReply, FastifyRequest } from "fastify"
import { IUser } from "../interfaces"
import type * as s from 'zapatos/schema'
import * as db from 'zapatos/db'
import pool from '../db/pgPool'

const staticUsers: IUser[] = [
    {
        id: 1,
        name: 'Joyce Byers'
    }
]

export const listUsers =
    async (request: FastifyRequest, reply: FastifyReply) => {
        return db.sql<s.users.SQL, s.users.Selectable[]>`SELECT * FROM ${"users"}`
            .run(pool)
            .then((users) => ({ data: users }))
        // Or .then((users) => reply.send({ data: users }))
    }

export const getUser =
    async (request: FastifyRequest, reply: FastifyReply) => {
    const id = Number(request.params['id'])
    return await db.sql<s.users.SQL, s.users.Selectable[]>`SELECT * FROM ${"users"} WHERE ${"user_id"} = ${db.param(id)}`
        .run(pool)
        .then((user) => {
            if (user[0]) {
                return reply.send({data: user})
            } else {
                return reply.send({data: "User not found"})
            }
        })
}

export const createUser =
    async (request: FastifyRequest, reply: FastifyReply) => {
    const user: IUser = request.body as IUser;
    const users = await db.sql<s.users.SQL, s.users.Selectable[]>`SELECT * FROM ${"users"}`.run(pool)
    let biggestId = 0
    for (let i = 0; i < users.length; i++) {
        if (users[i].user_id > biggestId) {
            biggestId = users[i].user_id
        }
    }

    user.id = biggestId + 1
    await db.sql<s.users.SQL, s.users.Selectable[]> `INSERT INTO ${"users"} VALUES (${db.param(user.id)}, ${db.param(user.name)})`.run(pool)
    return reply.send({data: "Done !"})
}

export const updateUser =
    async (request: FastifyRequest, reply: FastifyReply) => {
        const id = Number(request.params['id'])
        const users = await db.sql<s.users.SQL, s.users.Selectable[]>`SELECT * FROM ${"users"}`.run(pool)
        for (let i = 0; i < users.length; i++) {
            if (users[i].user_id === id) {
                const newInfos = request.body
                for (let j = 0; j < Object.keys(newInfos).length; j++) {
                    users[i][Object.keys(newInfos)[j]] = newInfos[Object.keys(newInfos)[j]]
                }
                let user = await db.sql<s.users.SQL, s.users.Insertable> `UPDATE ${"users"} SET ${"name"} = ${db.param(users[i].name)}, ${"score"} = ${db.param(users[i].score)} WHERE ${"user_id"} = ${db.param(users[i].user_id)}`.run(pool)
                reply.send({data: "Done !"})
            }
        }
}