import {Router} from "express"
import * as authController from "./auth.controller.js"

import {asyncHandler} from "../../utils/asyncHandler.js"

import {validate} from "../../middleware/validate.js"
import {signInSchema, signUpSchema} from "./auth.schema.js"

import {requireAuth} from "../../middleware/requireAuth.js"

const router = Router()
router.post("/signup", validate(signUpSchema), asyncHandler(authController.signUp))
router.post("/signin", validate(signInSchema), asyncHandler(authController.signIn))
router.post("/signout", authController.clearCookie)

router.post("/me", requireAuth, authController.me)

export default router