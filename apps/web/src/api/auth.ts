const BASE = "http://localhost:3000"

export type UserDto = {
    id: number;
    email: string;
    createdAt: string;
    updatedAt?: string
}

type ApiOk<T> = {ok: true; data: T}
type ApiErr = {ok: false; message: string; issues?: unknown}

async function postJson<T>(path: string, body: unknown): Promise<ApiOk<T>> {
    const res = await fetch(`${BASE}${path}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    })

    const payload = (await res.json().catch(() => ({}))) as ApiOk<T> | ApiErr;

    if (!res.ok) {
        const msg = (payload as ApiErr)?.message
        const err = new Error(msg) as Error & {status: number; payload: unknown}
        err.status = res.status
        err.payload = payload
        throw err
    }

    return payload as ApiOk<T>
}

export function signup(email: string, password: string) {
    return postJson<UserDto>("/auth/signup", {email, password})
}

export function signin(email: string, password: string) {
    return postJson<UserDto>("/auth/signin", {email, password})
}