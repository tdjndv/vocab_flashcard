export async function seed(knex) {
  const USER_ID = 3;

  // 1) Delete EVERYTHING first (child table first, then parent)
  await knex("vocab_entries").del();
  await knex("vocabulary").del();

  // 2) Simple seed data for user 3
  const vocabData = [
    {
      language: "en",
      word: "apple",
      entries: [{ definition: "a round fruit that is usually red or green", sample_sentence: "I ate an apple." }],
    },
    {
      language: "en",
      word: "run",
      entries: [{ definition: "to move quickly on foot", sample_sentence: "I run every morning." }],
    },
    {
      language: "en",
      word: "happy",
      entries: [{ definition: "feeling good or pleased", sample_sentence: "She feels happy today." }],
    },
    {
      language: "fr",
      word: "bonjour",
      entries: [{ definition: "a greeting meaning hello", sample_sentence: "Bonjour ! Comment ça va ?" }],
    },
    {
      language: "fr",
      word: "merci",
      entries: [{ definition: "a word meaning thank you", sample_sentence: "Merci pour ton aide." }],
    },
  ];

  // 3) Insert vocab + entries, returning vocab id (Postgres)
  for (const vocab of vocabData) {
    const [{ id: vocabId }] = await knex("vocabulary")
      .insert({
        user_id: USER_ID,
        language: vocab.language,
        word: vocab.word,
      })
      .returning(["id"]);

    await knex("vocab_entries").insert(
      vocab.entries.map((e) => ({
        vocab_id: vocabId,
        definition: e.definition,
        sample_sentence: e.sample_sentence,
      }))
    );
  }
}
