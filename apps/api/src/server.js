import "./env.js"

import express from "express"
import cors from "cors"

import * as errorHandler from "./middleware/errorHandler.js"

import authRoutes from "./modules/auth/auth.routes.js"
import vocabRoutes from "./modules/vocab/vocab.routes.js"

import cookieParser from "cookie-parser"

const app = express()
app.use(express.json())

app.use(cookieParser())
app.use(cors({
  origin: ["http://localhost:5173"
  ],
  credentials: true,
}))

app.use("/auth", authRoutes)
app.use("/vocab", vocabRoutes)

app.get("/", (req, res) => {
    res.json({ok: true, message: "Welcome to the main server page"});
})

// error handling
app.use(errorHandler.notFound)
app.use(errorHandler.generalError)

app.listen(process.env.PORT, () => {
    console.log("Server is listening on " + process.env.PORT)
})