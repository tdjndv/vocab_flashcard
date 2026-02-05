import * as authService from "./auth.service.js"

import {signToken, verifyToken} from "../../utils/jwt.js"

function setCookie(res, token) {
    res.cookie("token", token, {
        httpOnly: false,
        sameSite: "lax",
        secure: false,
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
}

export function clearCookie(req, res) {
    res.clearCookie("token", {
        httpOnly: false,
        sameSite: "lax",
        secure: false,
        path: "/"
    })
    return res.json({ok: true})
}

export async function signIn(req, res) {
    const user = await authService.signIn(req.validated.body)

    const token = signToken(user)

    setCookie(res, token)

    return res.json({ok: true, data: user})
}

export async function signUp(req, res) {
    const user = await authService.signUp(req.validated.body)

    const token = signToken(user)

    setCookie(res, token)

    return res.json({ok: true, data: user})
}

export async function me(req, res) {
    return res.json({ok: true, data: req.user})
}