import * as vocabService from "./vocab.service.js"

export async function getVocabList(req, res) {
    const userId = req.user.id

    const vocabs = await vocabService.getVocabList(userId)

    return res.json({ok: true, data: vocabs})
}

export async function getVocabById(req, res) {
    const userId = req.user.id
    const vocabId = req.validated.params.id;

    const vocab = await vocabService.getVocabById(userId, vocabId)

    return res.json({ok: true, data: vocab})
}

export async function updateVocabById(req, res) {
    const userId = req.user.id
    const vocabId = req.validated.params.id
    const updateInfo = req.validated.body

    const vocab = await vocabService.updateVocabById(userId, vocabId, updateInfo)

    return res.json({ok: true, data: vocab})
}

export async function deleteVocabById(req, res) {
    const userId = req.user.id
    const vocabId = req.validated.params.id
    
    await vocabService.deleteVocabById(userId, vocabId)

    return res.json({ok: true})
}

export async function createVocab(req, res) {
    const userId = req.user.id
    const createInfo = req.validated.body

    const vocab = await vocabService.createVocab(userId, createInfo)

    return res.json({ok: true, data: vocab})
}