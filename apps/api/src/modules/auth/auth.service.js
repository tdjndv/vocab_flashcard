import * as authRepo from "./auth.repo.js"

import {userDto} from "./auth.dto.js"

export async function signin({email, password}) {
    const user = await authRepo.findByEmail(email)

    if (user.password !== password) {
        const error = new Error("Invalid credentials")
        error.statusCode = 401
        throw error
    }
    return userDto(user)
}

export async function signup({email, password}) {
    const existing = await authRepo.findByEmail(email)
    if (existing) {
        const error = new Error("Email already exists")
        error.statusCode = 409
        throw error
    }
    const user = await authRepo.createUser({email, password})
    return userDto(user);
}