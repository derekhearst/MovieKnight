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

// export const streamingApi = Axios.create({
//   baseURL: 'https://streaming-availability.p.rapidapi.com/get/basic',
//   params: {
//     api_key: '868b336456msh6ca45ebe74a7adcp177b1fjsna40d8b3a7a6e',
//     host: 'streaming-availability.p.rapidapi.com'
//   }
//   })
  