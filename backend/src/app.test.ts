import request from "supertest"
import { app } from "./app"
import * as database from "./db/pg-database"

const spyGetCountryInfoFromDB = jest.spyOn(database, "getCountryInfoFromDB")

describe("App", () => {
  afterEach(() => {
    spyGetCountryInfoFromDB.mockClear()
  })

  describe("countryInfo", () => {
    it("should return country info with Spain as country query parameter", async () => {
      const res = await request(app).get("/home-assignment/countryInfo").query({ country: "Spain" })

      expect(res.status).toEqual(200)
      expect(res.text).toMatchInlineSnapshot(
        `"[{"code":"ESP","name":"Spain","flag":"\\\\uD83C\\\\uDDEA\\\\uD83C\\\\uDDF8","population":47351567}]"`
      )
    })

    it("should return empty array without query parameter", async () => {
      const res = await request(app).get("/home-assignment/countryInfo")

      expect(res.status).toEqual(200)
      expect(res.text).toMatchInlineSnapshot(`"[]"`)
    })

    it("should return error if error from db", async () => {
      spyGetCountryInfoFromDB.mockRejectedValueOnce(new Error("Error from db"))
      const res = await request(app).get("/home-assignment/countryInfo").query({ country: "Spain" })

      expect(res.status).toEqual(500)
      expect(res.text).toMatchInlineSnapshot(`"{"message":"Internal server error"}"`)
    })
  })

  describe("countries", () => {
    it("should return list of countries", async () => {
      const res = await request(app).get("/home-assignment/countries").query({ country: "Spain" })

      expect(res.status).toEqual(200)
      expect(res.text).toMatchInlineSnapshot(
        `"[{"code":"HUN","name":"Hungary"},{"code":"HRV","name":"Croatia"},{"code":"SWE","name":"Sweden"},{"code":"ESP","name":"Spain"},{"code":"NLD","name":"Netherlands"},{"code":"LUX","name":"Luxembourg"},{"code":"BEL","name":"Belgium"},{"code":"DEU","name":"Germany"},{"code":"SVN","name":"Slovenia"},{"code":"MLT","name":"Malta"},{"code":"FIN","name":"Finland"},{"code":"IRL","name":"Ireland"},{"code":"DNK","name":"Denmark"},{"code":"BGR","name":"Bulgaria"},{"code":"POL","name":"Poland"},{"code":"LVA","name":"Latvia"},{"code":"AUT","name":"Austria"},{"code":"EST","name":"Estonia"},{"code":"PRT","name":"Portugal"},{"code":"CYP","name":"Cyprus"},{"code":"CZE","name":"Czechia"},{"code":"ITA","name":"Italy"},{"code":"GRC","name":"Greece"},{"code":"LTU","name":"Lithuania"},{"code":"SVK","name":"Slovakia"},{"code":"ROU","name":"Romania"},{"code":"FRA","name":"France"},{"code":"FIC","name":"Fiction"}]"`
      )
    })
  })

  describe("citiesByPopulation", () => {
    it("should return list of cities over or equal with polutation", async () => {
      const res = await request(app).get("/home-assignment/citiesByPopulation").query({ population: "3000000" })

      expect(res.status).toEqual(200)
      expect(res.text).toMatchInlineSnapshot(`"["Spain (Madrid, 3305408)","Germany (Berlin, 3677472)"]"`)
    })

    it("should return error if polution query parameter is missing", async () => {
      const res = await request(app).get("/home-assignment/citiesByPopulation")

      expect(res.status).toEqual(500)
      expect(res.text).toMatchInlineSnapshot(`"{"message":"Internal server error"}"`)
    })
  })
})
