import Axios from 'axios'
import { baseURL } from '../env'
export const api = Axios.create({
  baseURL,
  timeout: 8000
})

export const movieApi = Axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  timeout: 5000,
  params: {
    api_key: 'c53f94b7b59709a841b552406a77d2e0',
    sort_by: 'popularity.desc',
    "certification.lt":'r'
  }
})
