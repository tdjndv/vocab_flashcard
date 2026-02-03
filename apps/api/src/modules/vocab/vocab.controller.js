import * as vocabService from "./vocab.service.js"

export async function getVocab(req, res, next) {
    try {
        const userId = req.user.id

        const vocabs = await vocabService.vocabList(userId)

        return res.json({ok: true, data: vocabs})
    } catch(e) {
        next(e)
    }
}