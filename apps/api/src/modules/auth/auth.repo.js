import {db} from "../../db.js"

export async function findByEmail(email) {
    return await db("users")
    .select(["id", "email", "password", "created_at"])
    .where({email})
    .first()
}

export async function findById(id) {
    return await db("users")
    .select("id", "email", "password", "created_at")
    .where({id})
    .first()
}

export async function createUser({email, password}) {
    const [user] = await db("users")
    .insert({email, password})
    .returning(["id", "email", "password", "created_at"])

    return user
}