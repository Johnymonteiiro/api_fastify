import { app } from '../app/app'
import { env } from '../env'

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Http Server is Running!')
  })
