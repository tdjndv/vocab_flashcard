import {api} from "./client"

export type UserDto = {
    id: number;
    email: string;
    createdAt: string
    updatedAt?: string;
}

export async function signUp(email: string, password: string): Promise<UserDto> {
    const res = await api.post("/auth/signup", {email, password})
    return res.data.data
}

export async function signIn(email: string, password: string): Promise<UserDto> {
    const res = await api.post("/auth/signin", {email, password})
    return res.data.data
}

export async function signOut(): Promise<void> {
    await api.post("/auth/signout")
}

export async function getMe(): Promise<UserDto> {
    const res = await api.post("/auth/me")
    return res.data.data
}