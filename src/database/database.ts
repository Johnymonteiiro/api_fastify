import 'dotenv/config'
import { Knex, knex as setupKnex } from 'knex'
import { env } from '../env'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL env not found')
}

const ConnectionsPath =
  env.DATABASE_CLIENT === 'sqlite'
    ? { filename: env.DATABASE_URL }
    : env.DATABASE_CLIENT

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: ConnectionsPath,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './tmp/migratios',
  },
}
export const knex = setupKnex(config)
