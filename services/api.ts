import axios, { AxiosInstance } from "axios"

const http: AxiosInstance = axios.create({
  baseURL: "https://restcountries.com/v3.1"
})

const httpJson: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  }
})

const request: AxiosInstance = axios.create({
  baseURL: ""
})

const api = { http, httpJson, request }

export default (api)