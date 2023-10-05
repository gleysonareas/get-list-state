import axios, { AxiosInstance } from "axios"

const http: AxiosInstance = axios.create({
  baseURL: "https://restcountries.com/v3.1"
})

const httpJson: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000"
})

const api = { http, httpJson }

export default (api)