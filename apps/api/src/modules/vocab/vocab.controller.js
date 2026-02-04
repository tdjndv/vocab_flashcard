import * as vocabService from "./vocab.service.js"

export async function getVocabList(req, res, next) {
    const userId = req.user.id

    const vocabs = await vocabService.vocabList(userId)

    return res.json({ok: true, data: vocabs})
}

export async function getVocabById(req, res) {
    const userId = req.user.id
    const vocabId = req.validated.params.id;

    const vocab = await vocabService.getVocabById(userId, vocabId)

    return res.json({ok: true, data: vocab})
}

export async function updateVocab(req, res) {
    const userId = req.user.id
    const vocabId = req.validated.params.id

    


}
export async function deleteVocab(req, res) {}

export async function addEntry(req, res) {}