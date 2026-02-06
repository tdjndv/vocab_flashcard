import {z} from "zod"

export const getVocabByIdSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive()
    })
})

export const updateVocabByIdSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive()
    }),
    body: z.object({
        word: z.string().trim().min(1),
        language: z.string().trim().min(1),
        note: z.string().trim().min(1)
    })
})

export const addVocabSchema = z.object({
    body: z.object({
        word: z.string().trim().min(1),
        language: z.string().trim().min(1),
        note: z.string().trim().min(1)
    })
})