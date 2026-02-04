import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .email("invalid email")
  .transform((s) => s.toLowerCase());

export const signUpSchema = z.object({
  body: z.object({
    email: emailSchema,
    password: z
      .string()
      .min(6, "password must be at least 6 characters")
      .max(72, "password too long"),
  }),
});

export const signInSchema = z.object({
  body: z.object({
    email: emailSchema,
    password: z.string().min(1, "password is required"),
  }),
});