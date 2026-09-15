import { z } from "zod"

export const signInSchema = z.object({
    email: z.email(),
    password: z
        .string()
        .min(8, "Password minimal 8 karakter")
        .max(100)
        .regex(/[A-Z]/, "Harus ada huruf besar")
        .regex(/[a-z]/, "Harus ada huruf kecil")
        .regex(/[0-9]/, "Harus ada angka")
    // .regex(/[^A-Za-z0-9]/, "Harus ada simbol")
})

export type SignInSchema = z.infer<typeof signInSchema>