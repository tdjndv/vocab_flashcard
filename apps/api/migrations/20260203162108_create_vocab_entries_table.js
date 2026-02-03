export async function up(knex) {
    await knex.schema.createTable("vocab_entries", (t) => {
        t.bigIncrements("id").primary()

        t.bigInteger("vocab_id").unsigned().notNullable()

        t.text("definition").notNullable()
        t.text("sample_sentence").notNullable()

        t.timestamp("created_at").notNullable().defaultTo(knex.fn.now())
        t.timestamp("updated_at").notNullable().defaultTo(knex.fn.now())

        t.foreign("vocab_id").references("id").inTable("vocabulary").onDelete("CASCADE")

        t.index(["vocab_id"])
    })
}

export async function down(knex) {
    await knex.schema.dropTableIfExists("vocab_entries")
}