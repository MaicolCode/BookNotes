import { z } from 'zod'

export const createNoteSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required'
    })
    .min(10, 'Title must be at least 10 characters'),
  content: z
    .string({
      required_error: 'Content is required'
    })
    .min(10, 'Content must be at least characters')
})
