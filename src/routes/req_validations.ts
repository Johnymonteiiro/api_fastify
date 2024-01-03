import { z } from 'zod'

export const createTransationsBodySchema = z.object({
  title: z.string(),
  amount: z.number(),
  type: z.enum(['credit', 'debit']),
})

export const getTransactionsSchemaValidation = z.object({
  id: z.string().uuid(),
})
