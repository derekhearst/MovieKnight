import { AppState } from "../AppState.js"
import { Movie } from "../models/Movie.js"
import { logger } from "../utils/Logger.js"
import { movieApi } from "./AxiosService.js"



class MoviesService{
 async getMovies(page = 1){
   const res = await movieApi.get('discover/movie?page=' + page)
   AppState.movies = res.data.results.map(m => new Movie(m))
   logger.log(AppState.movies)
 }
 async getMovieById(id){
  const res = await movieApi.get('movie/' + id)
  AppState.activeMovie = new Movie(res.data)
  logger.log(AppState.activeMovie)
 }
}

export const moviesService = new MoviesService()