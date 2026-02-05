import {Router} from "express"

import {requireAuth} from "../../middleware/requireAuth.js"

import {asyncHandler} from "../../utils/asyncHandler.js"

import * as vocabController from "./vocab.controller.js"

import { addVocabSchema, getVocabByIdSchema, updateVocabByIdSchema } from "./vocab.schema.js"

import {validate} from "../../middleware/validate.js"

const router = Router()

router.get("/", requireAuth, asyncHandler(vocabController.getVocabList))

router.get("/:id", validate(getVocabByIdSchema), requireAuth, asyncHandler(vocabController.getVocabById))

router.put("/:id", validate(updateVocabByIdSchema), requireAuth, asyncHandler(vocabController.updateVocabById))

router.delete("/:id", validate(getVocabByIdSchema), requireAuth, asyncHandler(vocabController.deleteVocabById))

router.post("/", validate(addVocabSchema), requireAuth, asyncHandler(vocabController.createVocab))

export default router