export async function seed(knex) {
  const USER_ID = 3;

  await knex("vocab_entries")
    .whereIn(
      "vocab_id",
      knex("vocabulary").select("id").where("user_id", USER_ID)
    )
    .del();

  await knex("vocabulary").where("user_id", USER_ID).del();

  const vocabData = [
    {
      language: "en",
      word: "evade",
      entries: [
        { definition: "to avoid dealing with something", sample_sentence: "He tried to evade responsibility." },
        { definition: "to escape or elude", sample_sentence: "The suspect evaded the police." },
      ],
    },
    {
      language: "en",
      word: "keen",
      entries: [
        { definition: "very interested, eager, or enthusiastic", sample_sentence: "She is keen to learn French." },
      ],
    },
    {
      language: "fr",
      word: "démarche",
      entries: [
        { definition: "a process or course of action; steps taken", sample_sentence: "Il a entrepris une démarche administrative." },
      ],
    },
  ];

  for (const vocab of vocabData) {
    const [{ id: vocabId }] = await knex("vocabulary")
      .insert({
        user_id: USER_ID,
        language: vocab.language,
        word: vocab.word,
      })
      .returning(["id"]);

    const entries = vocab.entries.map((e) => ({
      vocab_id: vocabId,
      definition: e.definition,
      sample_sentence: e.sample_sentence,
    }));

    await knex("vocab_entries").insert(entries);
  }
}
