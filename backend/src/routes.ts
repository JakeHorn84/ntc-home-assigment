import { config } from "dotenv"
import express, { Request, Response } from "express"
import { checkConnection, getCitiesByPopulation, getCountriesListFromDB, getCountryInfoFromDB } from "./db/pg-database"

config()

export const router = express.Router()

// TODO request validation
router.get("/countryInfo", async (req: Request, res: Response) => {
  // TODO validate query parameter
  const country = req.query.country + ""
  try {
    const queryResult = await getCountryInfoFromDB(country)
    // TODO common return function
    return res.contentType("application/json").status(200).json(queryResult.rows)
  } catch (e) {
    // TODO better error logging and error handling
    return res.contentType("application/json").status(500).json({
      message: "Internal server error"
    })
  }
})

router.get("/countries", async (req: Request, res: Response) => {
  try {
    const queryResult = await getCountriesListFromDB()

    return res.contentType("application/json").status(200).json(queryResult.rows)
  } catch (e) {
    return res.contentType("application/json").status(500).json({
      message: "Internal server error"
    })
  }
})

router.get("/citiesByPopulation", async (req: Request, res: Response) => {
  const population = req.query.population + ""
  try {
    const queryResult = await getCitiesByPopulation(population)
    const cities = queryResult.rows.map(city => `${city.country_name} (${city.name}, ${city.population})`)

    return res.contentType("application/json").status(200).json(cities)
  } catch (e) {
    return res.contentType("application/json").status(500).json({
      message: "Internal server error"
    })
  }
})

router.get("/health", async (req: Request, res: Response) => {
  try {
    await checkConnection()
    return res.contentType("application/json").status(200).json({ message: "OK" })
  } catch (e) {
    return res.contentType("application/json").status(500).json({
      message: "Internal server error"
    })
  }
})
