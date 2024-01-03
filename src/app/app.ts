import cookie from '@fastify/cookie'
import fastify from 'fastify'
import { checkSessionIdExist } from '../middlewares/check-session-id'
import { transactiosRoutes } from '../routes/transactios'

export const app = fastify()

app.register(cookie) // set cookies
app.addHook('preHandler', checkSessionIdExist) // Global Middleware for all routes

app.register(transactiosRoutes, {
  prefix: 'transactions',
})
