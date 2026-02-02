import "./env.js"

import express from "express"
import cors from "cors"

import * as errorHandler from "./middleware/errorHandler.js"

import authRoutes from "./modules/auth/auth.routes.js"

const app = express()
app.use(express.json())
app.use(cors())

app.use("/auth", authRoutes)

app.get("/", (req, res) => {
    res.json({ok: true, message: "Welcome to the main server page"});
})

// error handling
app.use(errorHandler.notFound)
app.use(errorHandler.generalError)

app.listen(process.env.API_PORT, () => {
    console.log("Server is listening on " + process.env.API_PORT)
})