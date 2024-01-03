import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkSessionIdExist(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionId = request.cookies.sessionId
  const method = 'POST'
  if (!sessionId && request.method !== method) {
    return reply.status(401).send({
      error: 'Unauthorized.',
    })
  }
}
