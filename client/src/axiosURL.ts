import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL

// const Token = ""

export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userReuqest = axios.create({
    
})