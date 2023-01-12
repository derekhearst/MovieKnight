import { AppState } from "../AppState.js"
import { Movie } from "../models/Movie.js"
import { logger } from "../utils/Logger.js"
import { movieApi } from "./AxiosService.js"

class MoviesService {
	async getMovies(page = 1) {
		const res = await movieApi.get("discover/movie?page=" + page)
		AppState.searchMovies = res.data.results.map(m => new Movie(m))
		logger.log("Getting movies", AppState.searchMovies)
	}
	async searchMovies(search) {
		const res = await movieApi.get("search/movie", { params: { query: search } })
		AppState.searchMovies = res.data.results.map(m => new Movie(m))
		logger.log("Searching movies", AppState.searchMovies)
	}
	async getMovieById(id) {
		logger.log("abobut to get movie", id)
		const res = await movieApi.get("movie/" + id)
		logger.log("Gotten Movie", res.data)
		AppState.activeMovie = new Movie(res.data)
		logger.log(AppState.activeMovie)
	}
}

export const moviesService = new MoviesService()
