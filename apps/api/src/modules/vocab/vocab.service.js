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