import {z} from "zod"

export const getVocabByIdSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive({message: "positive integer is required"})
    })
})