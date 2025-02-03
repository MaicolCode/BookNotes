import { z } from 'zod'

export const registerSchema = z.object({
  username: z
    .string({
      required_error: 'Username is required'
    })
    .min(4, { message: 'Username must be at least 4 character' }),
  email: z
    .string({
      required_error: 'Email is required'
    })
    .email({
      message: 'Please enter a valid email address'
    }),
  password: z
    .string({
      required_error: 'Password is required'
    })
    .min(6, {
      message: 'Password must be at least 6 characters.'
    })
})

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required'
    })
    .email({
      message: 'Please enter a valid email address'
    }),
  password: z
    .string({
      required_error: 'Password is required'
    })
    .min(6, {
      message: 'Password must be at least 6 characters'
    })
})
