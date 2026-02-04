import {z} from "zod"

export const getVocabByIdSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive({message: "positive integer is required"})
    })
})

export const updateVocabByIdSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive({message: "positive integer is required"})
    }),
    body: z.object({
        word: z.string().trim().min(1, "Word cannot be empty"),
        language: z.string().trim().min(1, "language cannot be empty")
    })
})