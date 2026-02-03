export async function seed(knex) {
  // 你想塞给哪个用户（确保 users 表里有这个 id）
  const USER_ID = 2;

  // 先清掉（可选：只清 USER_ID 的数据）
  await knex("vocab_entries")
    .whereIn("vocab_id", knex("vocabulary").select("id").where("user_id", USER_ID))
    .del();

  await knex("vocabulary").where("user_id", USER_ID).del();

  // 要插入的数据
  const vocabData = [
    {
      language: "en",
      word: "evade",
      entries: [
        {
          definition: "to avoid dealing with something",
          sample_sentence: "He tried to evade responsibility.",
        },
        {
          definition: "to escape or elude",
          sample_sentence: "The suspect evaded the police.",
        },
      ],
    },
    {
      language: "en",
      word: "keen",
      entries: [
        {
          definition: "very interested, eager, or enthusiastic",
          sample_sentence: "She is keen to learn French.",
        },
      ],
    },
    {
      language: "fr",
      word: "démarche",
      entries: [
        {
          definition: "a process or course of action; steps taken",
          sample_sentence: "Il a entrepris une démarche administrative.",
        },
      ],
    },
  ];

  // 插 vocab + entries
  for (const vocab of vocabData) {
    const [vocabId] = await knex("vocabulary").insert({
      user_id: USER_ID,
      language: vocab.language,
      word: vocab.word,
    });

    const entries = vocab.entries.map((e) => ({
      vocab_id: vocabId,
      definition: e.definition,
      sample_sentence: e.sample_sentence,
    }));

    await knex("vocab_entries").insert(entries);
  }
}
