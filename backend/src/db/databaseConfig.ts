import { ClientConfig } from "pg"

export function createConfig(): ClientConfig {
  return {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: 5432
  }
}
