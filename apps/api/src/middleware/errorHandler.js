export function notFound(req, res) {
    res.status(404).json({
        ok: false,
        message: "Routes not found"
    })
}

export function generalError(error, req, res, next) {
    const status = Number(error.statusCode || error.status || 500);

    res.status(status).json({
        ok: false,
        message: error.message || "Server error"
    })
}