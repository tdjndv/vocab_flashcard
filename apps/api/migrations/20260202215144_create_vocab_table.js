export async function up(knex) {
    await knex.schema.createTable("vocabulary", (t) => {
        t.bigIncrements("id").primary()

        t.integer("user_id").unsigned().notNullable()
        t.string("language", 10).notNullable()
        t.string("word", 255).notNullable()
        t.string("note").notNullable()

        t.timestamp("created_at").notNullable().defaultTo(knex.fn.now())
        t.timestamp("updated_at").notNullable().defaultTo(knex.fn.now())

        t.foreign("user_id").references("id").inTable("users").onDelete("CASCADE")

        t.index(["user_id"])
        t.unique(["user_id", "language", "word"])
    })
}

export async function down(knex) {
    await knex.schema.dropTableIfExists("vocabulary")
}
