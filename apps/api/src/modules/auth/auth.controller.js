export async function signin(req, res) {
    const error = new Error("this is not legit signin code here")
    error.statusCode = 409
    throw error
}

export async function signup(req, res) {
    res.json({content: "this is an apple"})
}