import { Client, QueryResult } from "pg"
import { CityWithCountry, CountryRow, NameRow } from "../types"
import { createConfig } from "./databaseConfig"

let DB: Client

export async function initDb(): Promise<void> {
  try {
    const config = createConfig()
    DB = new Client(config)
    await DB.connect()
  } catch (err) {
    throw Error(`Database is NOT connected: ${err}`)
  }
}

export const checkConnection = async () => {
  const sql = `SELECT * FROM country LIMIT 1`

  try {
    return await DB.query(sql)
  } catch (err) {
    throw new Error(`Database test query failed: ${err}`)
  }
}

export const getCountryInfoFromDB = async (value: string): Promise<QueryResult<CountryRow>> => {
  const sql = `SELECT * FROM country WHERE name='${value}'`
  return await DB.query(sql)
}

export const getCountriesListFromDB = async (): Promise<QueryResult<NameRow>> => {
  const sql = `SELECT code, name FROM country`
  return await DB.query(sql)
}

export const getCitiesByPopulation = async (population: string): Promise<QueryResult<CityWithCountry>> => {
  const sql = `SELECT city.name, city.population, country.name AS country_name FROM city JOIN country ON city.countrycode = country.code WHERE city.population >= ${population}`
  return await DB.query(sql)
}
