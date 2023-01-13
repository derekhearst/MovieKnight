import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { moviesService } from "../services/MoviesService.js"
import { Movie } from "../models/Movie.js"

class AccountService {
	async getAccount() {
		try {
			const res = await api.get("/account")
			AppState.account = res.data
		} catch (err) {
			logger.error("HAVE YOU STARTED YOUR SERVER YET???", err)
		}
	}
	async getMyEvents() {
		const res = await api.get(`/account/events`)
		AppState.myEvents = res.data
		logger.log("Getting my events", AppState.myEvents)
	}
	async getMyGroups() {
		const res = await api.get(`/account/groups`)
		AppState.myGroups = res.data
		logger.log("Getting my groups", AppState.myGroups)
	}
	async addMovieToMyList(movieData) {
		// const movie = await moviesService.getMovieById(mdId)
		const res = await api.post(`account/movies`, movieData)
		logger.log(res.data)
		AppState.myMovies.push(res.data)
	}

	async deleteMovieFromMyList(movieId) {
		const res = await api.delete(`account/movies/${movieId}`)
		AppState.myMovies = AppState.myMovies.filter(m => m.id !== movieId)
		AppState.myFavoriteMovies = AppState.myFavoriteMovies.filter(m => m.id !== movieId)
	}

	async getMyMovies() {
		const res = await api.get("account/movies")
		let arr = res.data
		logger.log(arr, "[temp array]")
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].isFavorite == false) {
				AppState.myMovies.push(arr[i])
			} else {
				AppState.myFavoriteMovies.push(arr[i])
			}
		}
		logger.log(AppState.myFavoriteMovies, "my favorite array")
		logger.log(AppState.myMovies, "my movies array")
		// AppState.myMovies = res.data
		// logger.log("Getting my movies", AppState.myMovies)
	}
	async editAccount(body) {
		const res = await api.put(`account`, body)
		AppState.account = res.data
		logger.log("Editing account", body)
	}
	async switchFavorite(id) {
		const res = await api.post(`account/movies/${id}`)
		if (res.data.isFavorite == true) {
			AppState.myMovies = AppState.myMovies.filter(m => m.id !== id)
			AppState.myFavoriteMovies.push(res.data)
			logger.log(AppState.myFavoriteMovies, "logging favorites")
		} else {
			AppState.myFavoriteMovies = AppState.myFavoriteMovies.filter(m => m.id !== id)
			AppState.myMovies.push(res.data)
			logger.log(AppState.myMovies)
		}
		// let index =	AppState.myMovies.findIndex(m => m.id == id)
		// AppState.myMovies.splice(index, 1, res.data)
	}
}

export const accountService = new AccountService()
