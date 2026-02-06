import {db} from "../../db.js";

export async function listVocabRows(userId) {
  return await db("vocabulary")
  .where({user_id: userId})
}

export async function getVocabById(userId, vocabId) {
  return await db("vocabulary")
  .where({user_id: userId, id: vocabId})
  .first()
}

export async function updateVocabById(userId, vocabId, {word, language, note}) {
  const [updated] = await db("vocabulary")
    .where({id: vocabId, user_id: userId})
    .update({
      word: word,
      language: language,
      note: note,
      updated_at: db.fn.now()
    })
    .returning("*")

    return updated;
}

export async function deleteVocabById(userId, vocabId) {
  const deleteCount = await db("vocabulary")
  .where({id: vocabId, user_id: userId})
  .del()

  return deleteCount
}

export async function addVocab(userId, {word, language, note}) {
  const [row] = await db("vocabulary")
  .insert({
    user_id: userId,
    word: word,
    note: note,
    language: language
  })
  .returning("*")
  return row
}