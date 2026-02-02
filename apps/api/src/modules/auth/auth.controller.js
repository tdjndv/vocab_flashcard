import * as authService from "./auth.service.js"

export async function signin(req, res) {
    const user = await authService.signin(req.validated.body)

    return res.json({ok: true, data: user})
}

export async function signup(req, res) {
    const user = await authService.signup(req.validated.body)

    return res.json({ok: true, data: user})
}