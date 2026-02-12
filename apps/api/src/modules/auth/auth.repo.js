import {prisma} from "../../prisma.js"

export async function findByEmail(email) {
    return await prisma.user.findUnique({
        where: {email}
    })
}

export async function findById(id) {
    return await prisma.user.findUnique({
        where: {id}
    })
}

export async function createUser({email, password}) {
    return await prisma.user.create({
        data: {email, password}
    })
}