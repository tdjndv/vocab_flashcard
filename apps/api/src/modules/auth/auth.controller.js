import * as authService from "./auth.service.js"

import {signToken} from "../../utils/jwt.js"

export async function signin(req, res) {
    const user = await authService.signin(req.validated.body)

    const token = signToken(user)

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.json({ok: true, data: user})
}

export async function signup(req, res) {
    const user = await authService.signup(req.validated.body)

    return res.json({ok: true, data: user})
}