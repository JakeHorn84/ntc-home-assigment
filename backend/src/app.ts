import express from "express"
import { initDb } from "./db/pg-database"
import { router } from "./routes"

export const app: express.Application = express()

app.use(express.json())
app.use("/home-assignment", router)

async function start() {
  try {
    await initDb()
  } catch (e) {
    throw Error(`Failed to init db: ${e}`)
  }

  app.listen(3000)
}

// TODO some better error handling than just console.log()
start().catch(e => console.log(`Failed to start the application: ${e}`))
