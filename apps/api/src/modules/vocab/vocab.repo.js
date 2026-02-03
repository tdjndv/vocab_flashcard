import {db} from "../../db.js";

export function listVocabRows(userId) {
  return db("vocabulary as v")
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