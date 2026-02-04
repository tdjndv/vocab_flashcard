import * as authService from "./auth.service.js"

import {signToken} from "../../utils/jwt.js"

export async function signIn(req, res) {
    const user = await authService.signIn(req.validated.body)

    const token = signToken(user)

    res.cookie("token", token, {
        httpOnly: false,
        sameSite: "lax",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.json({ok: true, data: user})
}

export async function signUp(req, res) {
    const user = await authService.signUp(req.validated.body)

    return res.json({ok: true, data: user})
}