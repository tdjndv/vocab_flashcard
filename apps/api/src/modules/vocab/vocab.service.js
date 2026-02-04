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


export async function vocabList(userId) {
    const rows = await vocabRepo.listVocabRows(userId)
    return groupRows(rows)
}

export async function getVocabById(userId, vocabId) {
    const row = await vocabRepo.getVocabByUserIdVocabId(userId, vocabId)

    if (!row) {
        const error = new Error("word doens't exist")
        error.statusCode = 404
        throw error
    }

    return row
}

export async function updateVocabById(userId, vocabId, {word, language}) {
    if (!world || !language || word === "" || language === "") {
        const e = new Error("word and language are required for updating")
        e.statusCode = 400
        throw e
    }

    const row = await vocabRepo.updateVocabById(userId, vocabId, {word, language})

    if (!row) {}
}