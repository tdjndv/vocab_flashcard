import {Router} from "express"

import {requireAuth} from "../../middleware/requireAuth.js"

import * as vocabController from "./vocab.controller.js"

const router = Router()

router.get("/", requireAuth, vocabController.getVocab)

export default router