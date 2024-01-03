import { FastifyInstance } from 'fastify'
import crypto, { randomUUID } from 'node:crypto'
import { knex } from '../database/database'
import {
  createTransationsBodySchema,
  getTransactionsSchemaValidation,
} from './req_validations'

export async function transactiosRoutes(app: FastifyInstance) {
  const transactionsTable = 'transactions'

  app.get('/', async (request) => {
    const { sessionId } = request.cookies
    const transactios = await knex(transactionsTable)
      .where('session_id', sessionId)
      .select()

    return { transactios }
  })

  app.get('/summary', async (request) => {
    const { sessionId } = request.cookies
    const summary = await knex(transactionsTable)
      .where('session_id', sessionId)
      .sum('amount', { as: 'amount' })
      .first()

    return { summary }
  })

  app.get('/:id', async (request) => {
    const { id } = getTransactionsSchemaValidation.parse(request.params)
    const { sessionId } = request.cookies
    const transaction = await knex(transactionsTable)
      .where({
        session_id: sessionId,
        id,
      })
      .first()

    return transaction
  })

  app.post('/', async (request, reply) => {
    const { title, type, amount } = createTransationsBodySchema.parse(
      request.body,
    )

    let sessionId = request.cookies.sessionId // taking cookies from browser

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/', // In which routes the cookies will be availables
        maxAge: 100 * 60 * 60 * 24 * 7, // 7 days to expire the cookies
      })
    }

    await knex(transactionsTable).insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })
    return reply.status(201).send()
  })
}
