import {db} from "../../db.js";

export async function listVocabRows(userId) {
  return await db("vocabulary as v")
    .leftJoin("vocab_entries as e", "e.vocab_id", "v.id")
    .select(
      "v.id as vocabId",
      "v.language",
      "v.word",
      "e.id as entryId",
      "e.definition",
      "e.sample_sentence as sampleSentence"
    )
    .where("v.user_id", userId)
    .orderBy("v.id", "desc")
    .orderBy("e.id", "asc");
}

export async function getVocabById(userId, vocabId) {
  return await db("vocabulary")
  .select("id", "user_id", "language", "word", "created_at", "updated_at")
  .where({user_id: userId, id: vocabId})
  .first()
}

export async function updateVocabById(userId, vocabId, {word, language}) {
  const [updated] = await db("vocabulary")
    .where({id: vocabId, user_id: userId})
    .update({
      word: word,
      language: language,
      updated_at: db.fn.now()
    })
    .returning(["id", "user_id", "word", "language", "created_at", "updated_at"])

    return updated;
}

export async function deleteVocabById(userId, vocabId) {
  const deleteCount = await db("vocabulary")
  .where({id: vocabId, user_id: userId})
  .del()

  return deleteCount
}