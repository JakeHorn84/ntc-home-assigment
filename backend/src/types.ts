export interface CountryRow {
  code: string
  name: string
  flag: string
  population: number
}

export interface NameRow {
  name: string
}

export interface CityWithCountry {
  name: string
  population: number
  country_name: string
}
