import * as vocabRepo from "./vocab.repo.js"

export async function getVocabList(userId) {
    const rows = await vocabRepo.listVocabRows(userId)
    return rows
}

export async function getVocabById(userId, vocabId) {
    const row = await vocabRepo.getVocabById(userId, vocabId)

    if (!row) {
        const error = new Error("word doesn't exist")
        error.statusCode = 404
        throw error
    }

    return row
}

export async function updateVocabById(userId, vocabId, {word, language, note}) {
    const row = await vocabRepo.updateVocabById(userId, vocabId, {word, language, note})

    if (!row) {
        const e = new Error("word does not exist")
        e.statusCode = 400
        throw e
    }
    return row
}

export async function deleteVocabById(userId, vocabId) {
    const deleteCount = await vocabRepo.deleteVocabById(userId, vocabId)
    if (deleteCount === 0) {
        const e = new Error("word does not exist")
        e.statusCode = 400
        throw e
    }
    return true
}

export async function createVocab(userId, {word, language, note}) {
    try{
        const row = await vocabRepo.addVocab(userId, {word, language, note})
    } catch(e) {
        const err = new Error("insertion failed: possiblely duplicated word")
        err.statusCode = 400
        throw err
    }

    if (!row) {
        const e = new Error("Word cannot be added")
        e.statusCode = 400
        throw e
    }
    return row
}