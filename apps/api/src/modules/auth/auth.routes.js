import {Router} from "express"
import * as authController from "./auth.controller.js"

import {asyncHandler} from "../../utils/asyncHandler.js"

import {validate} from "../../middleware/validate.js"
import {signinSchema, signupSchema} from "./auth.schema.js"

const router = Router()
router.post("/signup", validate(signupSchema), asyncHandler(authController.signup))
router.post("/signin", validate(signinSchema), asyncHandler(authController.signin))

export default router