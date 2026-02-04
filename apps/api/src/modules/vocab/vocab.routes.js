import {Router} from "express"

import {requireAuth} from "../../middleware/requireAuth.js"

import {asyncHandler} from "../../utils/asyncHandler.js"

import * as vocabController from "./vocab.controller.js"
import { getVocabByIdSchema } from "./vocab.schema.js"

import {validate} from "../../middleware/validate.js"

const router = Router()

router.get("/", requireAuth, asyncHandler(vocabController.getVocabList))

router.get("/:id", validate(getVocabByIdSchema), requireAuth, asyncHandler(vocabController.getVocabById))

router.put("/:id", validate(getVocabByIdSchema), requireAuth, asyncHandler(vocabController.updateVocab))

router.delete("/:id", validate(getVocabByIdSchema), requireAuth, asyncHandler(vocabController.deleteVocab))

router.post("/:id/entries", requireAuth, asyncHandler(vocabController.addEntry))

export default router