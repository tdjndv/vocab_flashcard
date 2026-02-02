import {db} from "../../db.js"

export async function findByEmail(email) {
    return db("users")
    .select(["id", "email", "password", "created_at"])
    .where({email})
    .first()
}

export async function findById(id) {
    return db("users")
    .select("id", "email", "password", "created_at")
    .where({id})
    .first()
}

export async function createUser({email, password}) {
    const [insertedId] = await db("users")
    .insert({email, password})
    
    const result = await findById(insertedId)
    return result
}