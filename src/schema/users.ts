import { string, z } from 'zod'

export const SignUpSchema = z.object({
    name: z.string(),
    username: z.string(),
    password: z.string().min(6),
    phoneNumber: z.string()
})
