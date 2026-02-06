import * as vocabRepo from "./vocab.repo.js"

function groupRows(rows) {
    const map = new Map()

    for (const r of rows) {
        if (!map.has(r.vocabId)) {
            map.set(r.vocabId, {
                id: r.vocabId,
                language: r.language,
                word: r.word,
                entries: [],
            })
        }

        if (r.entryId) {
            map.get(r.vocabId).entries.push({
                id: r.entryId,
                definition: r.definition,
                sampleSentence: r.sampleSentence,
            });
        }
    }
    return Array.from(map.values())
}


export async function getVocabList(userId) {
    const rows = await vocabRepo.listVocabRows(userId)
    return groupRows(rows)
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

export async function createVocab(userId, {word, language}) {
    const row = await vocabRepo.addVocab(userId, {word, language, note})

    if (!row) {
        const e = new Error("Word cannot be added")
        e.statusCode = 400
        throw e
    }
    return row
}