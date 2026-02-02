export function notFound(req, res) {
    res.status(404).json({
        ok: false,
        message: "Routes not found"
    })
}

export function generalError(error, req, res, next) {
    res.status(error.statusCode).json({
        ok: false,
        message: error.message
    })
}